const r = JSON.parse(require('fs').readFileSync('scratch/audit_report.json', 'utf8'));
for (const [page, data] of Object.entries(r)) {
  console.log(`\n=== ${page} (${data.sections.length} sections, ${data.inlineStylesCount} inline styles) ===`);
  data.sections.forEach(s => {
    const cont = s.containers.length > 0 ? s.containers.join(', ') : 'NONE';
    const hdr = s.secHeader.exists ? (s.secHeader.center ? 'center' : 'left') : 'no-sec-header';
    console.log(`  #${s.num} <section.${s.class || 'no-class'} id="${s.id || ''}"> [${cont}] [hdr: ${hdr}, eye: ${s.secHeader.eyebrow}, ttl: ${s.secHeader.title}]`);
  });
}
