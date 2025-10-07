import { promises as fs } from 'fs';
import { resolve, join } from 'path';
import { execSync } from 'child_process';

const ROOT = resolve(__dirname, '..');
const DOCS_DIR = join(ROOT, 'docs');
const SOURCE_MD = join(DOCS_DIR, 'technical-documentation.md');
const BUILD_DIR = join(DOCS_DIR, '.docx-build');
const OUTPUT_DOCX = join(DOCS_DIR, 'technical-documentation.docx');
const OUTPUT_ZIP = join(DOCS_DIR, 'technical-documentation.zip');

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function paragraph(text: string, options: { style?: string; bold?: boolean; monospace?: boolean } = {}): string {
  const { style, bold = false, monospace = false } = options;
  const openStyle = style ? `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>` : '';
  const runPropsParts: string[] = [];
  if (bold) {
    runPropsParts.push('<w:b/>');
  }
  if (monospace) {
    runPropsParts.push('<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/>');
  }
  const runProps = runPropsParts.length ? `<w:rPr>${runPropsParts.join('')}</w:rPr>` : '';
  const safeText = escapeXml(text);
  return `<w:p>${openStyle}<w:r>${runProps}<w:t xml:space="preserve">${safeText}</w:t></w:r></w:p>`;
}

async function main() {
  const raw = await fs.readFile(SOURCE_MD, 'utf8');
  const lines = raw.replace(/\r\n/g, '\n').split('\n');

  const paragraphs: string[] = [];
  let inCode = false;

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inCode = !inCode;
      continue;
    }

    if (inCode) {
      paragraphs.push(paragraph(line || ' ', { monospace: true }));
      continue;
    }

    if (!line.trim()) {
      paragraphs.push('<w:p/>');
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = headingMatch[2].trim();
      const headingStyle = level === 1 ? 'Heading1'
        : level === 2 ? 'Heading2'
        : level === 3 ? 'Heading3'
        : level === 4 ? 'Heading4'
        : level === 5 ? 'Heading5'
        : 'Heading6';
      paragraphs.push(paragraph(content, { style: headingStyle, bold: level <= 2 }));
      continue;
    }

    const bulletMatch = line.match(/^[-*]\s+(.*)$/);
    if (bulletMatch) {
      paragraphs.push(paragraph(`• ${bulletMatch[1]}`, { style: 'ListParagraph' }));
      continue;
    }

    const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (numberedMatch) {
      paragraphs.push(paragraph(`${numberedMatch[1]}. ${numberedMatch[2]}`, { style: 'ListParagraph' }));
      continue;
    }

    paragraphs.push(paragraph(line));
  }

  const sectionProperties = '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr>';
  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n` +
    `<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">` +
    `<w:body>${paragraphs.join('')}${sectionProperties}</w:body></w:document>`;

  await fs.rm(BUILD_DIR, { recursive: true, force: true });
  await fs.mkdir(join(BUILD_DIR, '_rels'), { recursive: true });
  await fs.mkdir(join(BUILD_DIR, 'word', '_rels'), { recursive: true });

  await fs.writeFile(join(BUILD_DIR, '[Content_Types].xml'), `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
    `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>` +
    `<Default Extension="xml" ContentType="application/xml"/>` +
    `<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>` +
    `</Types>`);

  await fs.writeFile(join(BUILD_DIR, '_rels', '.rels'), `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
    `<Relationship Id="R1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>` +
    `</Relationships>`);

  await fs.writeFile(join(BUILD_DIR, 'word', '_rels', 'document.xml.rels'), `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>`);

  await fs.writeFile(join(BUILD_DIR, 'word', 'document.xml'), documentXml);

  await fs.rm(OUTPUT_DOCX, { force: true });
  await fs.rm(OUTPUT_ZIP, { force: true });

  const escapedBuild = BUILD_DIR.replace(/'/g, "''");
  const escapedZip = OUTPUT_ZIP.replace(/'/g, "''");
  const command = `Compress-Archive -Path '${escapedBuild}\\*' -DestinationPath '${escapedZip}' -Force`;
  execSync(`powershell.exe -NoProfile -Command "${command}"`, { stdio: 'inherit' });

  await fs.rename(OUTPUT_ZIP, OUTPUT_DOCX);
  await fs.rm(BUILD_DIR, { recursive: true, force: true });

  console.log(`DOCX gerado em: ${OUTPUT_DOCX}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
