// NukeMap - Search Engine (cities + ZIP codes + military/strategic targets)
window.NM = window.NM || {};

NM.searchLocations = function(q) {
  q = q.trim(); if (!q) return [];

  // Exact coordinates
  const cm = q.match(/^(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)$/);
  if (cm) { const la=+cm[1],ln=+cm[2]; if(la>=-90&&la<=90&&ln>=-180&&ln<=180) return [{name:`${la.toFixed(4)}, ${ln.toFixed(4)}`,detail:'Coordinates',lat:la,lng:ln,pop:0,score:100}] }

  // ZIP code lookup (exact 5-digit) — uses comprehensive ZIPDB (41,752 codes)
  if (/^\d{5}$/.test(q)) {
    // Try new comprehensive database first
    if (NM.ZIPDB && NM.ZIPDB[q]) {
      const parts = NM.ZIPDB[q].split(',');
      return [{name: parts.slice(2, -1).join(','), detail: `${parts[parts.length-1]} ${q}`, lat: +parts[0], lng: +parts[1], pop: 0, score: 100}];
    }
    // Fallback to city-embedded zips
    const i = NM.ZIP_IDX[q]; if (i !== undefined) { const c = NM.CITIES[i]; return [{name:c[0],detail:`${c[1]} ${q}`,lat:c[2],lng:c[3],pop:c[4],score:100}] }
  }

  // Partial ZIP (3-4 digits) — search ZIPDB for prefix matches
  if (/^\d{3,4}$/.test(q)) {
    const r = [], seen = new Set();
    if (NM.ZIPDB) {
      for (const [z, val] of Object.entries(NM.ZIPDB)) {
        if (z.startsWith(q)) {
          const parts = val.split(',');
          const city = parts.slice(2, -1).join(',');
          const st = parts[parts.length - 1];
          const key = city + st;
          if (!seen.has(key)) {
            seen.add(key);
            r.push({name: city, detail: `${st} (${z}...)`, lat: +parts[0], lng: +parts[1], pop: 0, score: 50, key});
          }
        }
        if (r.length >= 10) break;
      }
    }
    if (r.length) return r;
    // Fallback to old ZIP_IDX
    const r2 = [];
    for (const [z, i] of Object.entries(NM.ZIP_IDX)) {
      if (z.startsWith(q)) { const c = NM.CITIES[i], k = c[0]+c[1]; if (!r2.find(x=>x.key===k)) r2.push({name:c[0],detail:`${c[1]} (${z}...)`,lat:c[2],lng:c[3],pop:c[4],score:50+c[4]/1e5,key:k}); }
      if (r2.length >= 8) break;
    }
    if (r2.length) return r2.sort((a,b) => b.score - a.score);
  }

  const ql = q.toLowerCase(), qp = ql.split(/[,\s]+/).filter(Boolean), r = [];

  // Search cities
  for (const c of NM.CITIES) {
    const n=c[0].toLowerCase(),s=c[1].toLowerCase(),sf=NM.STATES[c[1]]?.toLowerCase()||s;let sc=0;
    if(n===ql)sc=100;else if(n.startsWith(ql))sc=80;else if(s===ql||sf===ql)sc=40;
    else if(qp.length>=2){const cq=qp.slice(0,-1).join(' '),sq=qp[qp.length-1];if(n.startsWith(cq)&&(s.startsWith(sq)||sf.startsWith(sq)))sc=90}
    if(!sc&&n.includes(ql))sc=60;
    if(!sc&&qp.length===1){for(const w of n.split(/[\s-]+/))if(w.startsWith(ql)){sc=55;break}}
    if(!sc&&qp.length>=1){const cb=n+' '+s+' '+sf;if(qp.every(p=>cb.includes(p)))sc=45}
    if(sc>0){sc+=Math.min(20,Math.log10(Math.max(c[4],1))*3);r.push({name:c[0],detail:c[1],lat:c[2],lng:c[3],pop:c[4],score:sc})}
  }

  // Search WW3 strategic targets
  const typeLabels = {icbm:'ICBM Base',bomber:'Bomber Base',sub:'Submarine Base',c2:'Command Center',nuclear:'Nuclear Facility',military:'Military Base',infra:'Infrastructure',city:'Metro Area'};
  const allTargets = [
    ...(NM.WW3_TARGETS_US || []).map(t => ({...t, side: 'US'})),
    ...(NM.WW3_TARGETS_RU || []).map(t => ({...t, side: 'RU'})),
    ...(NM.WW3_TARGETS_NATO || []).map(t => ({...t, side: 'NATO'})),
  ];
  for (const t of allTargets) {
    const n = t.name.toLowerCase();
    const catL = (t.cat || '').toLowerCase();
    const typeL = (t.type || '').toLowerCase();
    let sc = 0;
    if (n === ql) sc = 95;
    else if (n.startsWith(ql)) sc = 75;
    else if (n.includes(ql)) sc = 55;
    else if (typeL.includes(ql)) sc = 50;
    else if (catL.includes(ql)) sc = 40;
    else if (qp.length >= 1 && qp.every(p => (n + ' ' + catL + ' ' + typeL).includes(p))) sc = 45;
    if (sc > 0 && !r.find(x => Math.abs(x.lat - t.lat) < 0.01 && Math.abs(x.lng - t.lng) < 0.01)) {
      r.push({name: t.name, detail: `${typeLabels[t.type] || t.type} (${t.side})`, lat: t.lat, lng: t.lng, pop: 0, score: sc, isTarget: true});
    }
  }

  r.sort((a,b) => b.score - a.score || b.pop - a.pop);
  return r.slice(0, 12);
};
