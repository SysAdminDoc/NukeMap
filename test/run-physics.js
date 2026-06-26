#!/usr/bin/env node
// Headless physics regression test runner
// Loads physics.js (pure math, no DOM) and validates against reference data

const fs = require('fs');
const path = require('path');

// Minimal DOM shim so physics.js can set window.NM
global.window = global;
global.NM = {};

// Load physics module
const physicsCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'physics.js'), 'utf8');
eval(physicsCode);

// Reference data: [yield_kT, burstType, field, expected_km, tolerance_pct, source]
const TESTS = [
  [10, 'airburst', 'psi5',     1.51,  10, 'HSAJ 10kT'],
  [10, 'airburst', 'psi1',     4.58,  10, 'HSAJ 10kT'],
  [10, 'airburst', 'thermal3', 1.87,  15, 'HSAJ 10kT (8 cal/cm²)'],
  [1,  'airburst', 'psi20',    0.28,  10, 'NWFAQ 1kT'],
  [1,  'airburst', 'psi5',     0.71,  10, 'NWFAQ 1kT'],
  [1,  'airburst', 'psi1',     2.20,  10, 'NWFAQ 1kT'],
  [1,  'airburst', 'thermal3', 0.67,  10, 'NWFAQ 1kT'],
  [1000, 'airburst', 'psi20',   2.80,  15, 'OTA 1MT'],
  [1000, 'airburst', 'psi5',    7.10,  15, 'OTA 1MT'],
  [1000, 'airburst', 'psi1',   22.00,  15, 'OTA 1MT'],
  [20, 'airburst', 'thermal3',  2.70,  16, 'NWFAQ 20kT'],
  [20, 'airburst', 'thermal1',  4.30,  15, 'NWFAQ 20kT'],
  [1000, 'airburst', 'thermal3', 12.0,  15, 'NWFAQ 1MT'],
  [1000, 'airburst', 'thermal1', 18.0,  20, 'NWFAQ 1MT'],
  [1,    'airburst', 'fireball', 0.066, 15, 'G&D fireball 1kT'],
  [1000, 'airburst', 'fireball', 1.045, 15, 'G&D fireball 1MT'],
  [100, 'surface', 'psi5',     2.63,   15, 'NWFAQ surface 100kT (0.8x airburst)'],
  [10000, 'airburst', 'psi5',  15.30,  15, 'NWFAQ 10MT'],
  [10000, 'airburst', 'psi1',  47.40,  15, 'NWFAQ 10MT'],
  [100, 'water', 'baseSurge',  2.14,   10, 'G&D Ch.6 water 100kT (0.34·Y^0.4)'],
  [100, 'water', 'psi5',       2.63,   20, 'Water burst has surface blast factor (0.8x)'],
];

let passed = 0, failed = 0;
const failures = [];

for (const [yKt, burst, field, expected, tol, source] of TESTS) {
  const effects = NM.calcEffects(yKt, burst);
  const actual = effects[field];
  if (actual === undefined) {
    console.log(`FAIL: ${field} at ${yKt}kT ${burst} — field not found`);
    failed++;
    failures.push(`${field}@${yKt}kT`);
    continue;
  }
  const pctDiff = Math.abs((actual - expected) / expected * 100);
  if (pctDiff <= tol) {
    passed++;
  } else {
    const sign = actual > expected ? '+' : '';
    console.log(`FAIL: ${field} at ${yKt}kT ${burst} = ${actual.toFixed(3)}km (expected ${expected}km, ${sign}${((actual-expected)/expected*100).toFixed(1)}%, tol ±${tol}%) [${source}]`);
    failed++;
    failures.push(`${field}@${yKt}kT`);
  }
}

// Shared mortality function tests
const mortResult = NM.calcZoneMortality(NM.calcEffects(100, 'airburst'), 5000);
if (mortResult.deaths <= 0) { console.log('FAIL: calcZoneMortality returned 0 deaths for 100kT urban'); failed++; } else passed++;
if (!mortResult.perZone || mortResult.perZone.length !== 7) { console.log('FAIL: calcZoneMortality perZone has wrong length'); failed++; } else passed++;

const total = passed + failed;
console.log(`\nPhysics regression: ${passed}/${total} passed, ${failed} failed`);
if (failed > 0) {
  console.error('FAILURES:', failures.join(', '));
  process.exit(1);
}
