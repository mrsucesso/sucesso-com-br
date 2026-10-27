import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const page = fs.readFileSync('src/pages/raio-x.astro', 'utf8');
const start = page.indexOf('<script define:vars');
const end = page.indexOf('</script>', start);
if (start < 0 || end < 0) throw new Error('Script do Raio-X não encontrado.');
const script = page.slice(page.indexOf('>', start) + 1, end);
const temp = '/tmp/raio-x-browser-script-check.js';
fs.writeFileSync(temp, script);
try {
  execFileSync(process.execPath, ['--check', temp], { stdio: 'pipe' });
} catch (error) {
  throw new Error(`JavaScript do navegador inválido: ${error.stderr.toString()}`);
} finally {
  fs.unlinkSync(temp);
}
console.log('OK: JavaScript do navegador Raio-X é sintaticamente válido.');
