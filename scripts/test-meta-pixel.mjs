import fs from 'node:fs';

const component = fs.readFileSync('src/components/MetaPixel.astro', 'utf8');
const files = [
  'src/layouts/Layout.astro',
  'src/layouts/BlogPost.astro',
  'src/pages/index.astro',
  'src/pages/raio-x.astro',
  'src/pages/resultado21.astro',
  'src/pages/resultado21/obrigado.astro',
  'src/pages/blog/index.astro',
];

for (const token of [
  '28536331392735087',
  'connect.facebook.net/en_US/fbevents.js',
  "fbq('track', 'PageView')",
  'localStorage',
  'Permitir medição',
  'Agora não',
]) {
  if (!component.includes(token)) throw new Error(`MetaPixel sem: ${token}`);
}
for (const file of files) {
  if (!fs.readFileSync(file, 'utf8').includes('<MetaPixel />')) {
    throw new Error(`Cobertura MetaPixel ausente: ${file}`);
  }
}
console.log(`OK: Pixel coberto em ${files.length} entradas públicas.`);
