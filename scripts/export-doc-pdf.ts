import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const SOURCE = resolve(__dirname, '..', 'docs', 'technical-documentation.md');
const OUTPUT = resolve(__dirname, '..', 'docs', 'technical-documentation.pdf');

function sanitizeLine(line: string): string {
  if (!line.trim()) {
    return '';
  }
  let result = line;

  // Headings -> uppercase label
  if (/^\s*#{1,6}\s+/.test(result)) {
    result = result.replace(/^\s*#{1,6}\s+/, '').toUpperCase();
  }

  // Bullet list
  result = result.replace(/^\s*-\s+/, '• ');
  result = result.replace(/^\s*\d+\.\s+/, (match) => match.trim() + ' ');

  // Inline formatting
  result = result.replace(/`([^`]+)`/g, '$1');
  result = result.replace(/\*\*([^*]+)\*\*/g, '$1');
  result = result.replace(/\*([^*]+)\*/g, '$1');
  result = result.replace(/\[(.*?)\]\((.*?)\)/g, '$1 ($2)');

  return result;
}

function escapePdfText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function chunk<T>(input: T[], size: number): T[][] {
  const output: T[][] = [];
  for (let i = 0; i < input.length; i += size) {
    output.push(input.slice(i, i + size));
  }
  return output;
}

function buildPdf(pages: string[][]): Buffer {
  type PdfObject = { id: number; body: string };
  const objects: PdfObject[] = [];

  const addObject = (body: string): number => {
    const id = objects.length + 1;
    objects.push({ id, body });
    return id;
  };

  const catalogId = addObject('<< /Type /Catalog /Pages 2 0 R >>');
  const pagesNodeId = addObject(''); // placeholder, will fill later
  const fontId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');

  const pageIds: number[] = [];

  pages.forEach((lines, pageIndex) => {
    const leading = 14;
    const startY = 780;
    const contentLines = ['BT', '/F1 11 Tf', `1 ${leading} TL`, `72 ${startY} Td`];

    lines.forEach((line, idx) => {
      const text = escapePdfText(line || ' ');
      if (idx === 0) {
        contentLines.push(`(${text}) Tj`);
      } else {
        contentLines.push('T*');
        contentLines.push(`(${text}) Tj`);
      }
    });

    contentLines.push('ET');
    const streamContent = contentLines.join('\n');
    const streamLength = Buffer.byteLength(streamContent, 'utf8');
    const contentId = addObject(`<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream`);

    const pageBody = [
      '<< /Type /Page',
      ` /Parent ${pagesNodeId} 0 R`,
      ' /MediaBox [0 0 612 792]',
      ` /Resources << /Font << /F1 ${fontId} 0 R >> >>`,
      ` /Contents ${contentId} 0 R`,
      '>>',
    ].join('');
    const pageId = addObject(pageBody);
    pageIds.push(pageId);
  });

  const kids = pageIds.map((id) => `${id} 0 R`).join(' ');
  const pagesNodeBody = `<< /Type /Pages /Kids [${kids}] /Count ${pageIds.length} >>`;
  objects[pagesNodeId - 1].body = pagesNodeBody;

  const offsets: number[] = new Array(objects.length + 1).fill(0);
  const parts: string[] = [];
  parts.push('%PDF-1.4\n');
  let currentOffset = Buffer.byteLength(parts.join(''), 'utf8');

  objects.forEach((obj) => {
    const objString = `${obj.id} 0 obj\n${obj.body}\nendobj\n`;
    offsets[obj.id] = currentOffset;
    parts.push(objString);
    currentOffset += Buffer.byteLength(objString, 'utf8');
  });

  const xrefPosition = currentOffset;
  const xrefEntries = [`xref`, `0 ${objects.length + 1}`, '0000000000 65535 f '];
  for (let i = 1; i <= objects.length; i += 1) {
    const offset = offsets[i].toString().padStart(10, '0');
    xrefEntries.push(`${offset} 00000 n `);
  }
  const xrefString = xrefEntries.join('\n') + '\n';
  parts.push(xrefString);
  currentOffset += Buffer.byteLength(xrefString, 'utf8');

  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefPosition}\n%%EOF`;
  parts.push(trailer);

  return Buffer.from(parts.join(''), 'utf8');
}

function main() {
  const raw = readFileSync(SOURCE, 'utf8');
  const lines = raw.replace(/\r\n/g, '\n').split('\n');

  const processed: string[] = [];
  let inCode = false;

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inCode = !inCode;
      processed.push(inCode ? 'Código:' : 'Fim do código');
      continue;
    }

    if (inCode) {
      processed.push(`    ${line}`);
      continue;
    }

    processed.push(sanitizeLine(line));
  }

  const normalized = processed.map((line) => line.normalize('NFKC'));
  const pages = chunk(normalized, 45);
  const pdf = buildPdf(pages);
  writeFileSync(OUTPUT, pdf);
  console.log(`PDF gerado em: ${OUTPUT}`);
}

main();
