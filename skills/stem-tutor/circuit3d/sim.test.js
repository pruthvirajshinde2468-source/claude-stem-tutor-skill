// node sim.test.js — fails loudly if the stepper model breaks.
const assert = require('assert');
const { at, DEF } = require('./sim.js');
const close = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) < e, a + ' != ' + b);
const m = DEF.micro;

// EN high (or floating -> pull-up) or power off: no coil current.
for (const c of [{ power: 1, enPin: 1, n: 3 }, { power: 1, enPin: null, n: 3 }, { power: 0, enPin: 0, n: 3 }]) {
  const s = at(c); close(s.iA, 0); close(s.iB, 0); assert.deepStrictEqual(s.bridgeA, [0, 0, 0, 0]);
}

// 4 full steps = one electrical cycle: +A, +B, -A, -B.
const ip = at({ power: 1, enPin: 0, n: 0 }).ipk;
const exp = [[ip, 0], [0, ip], [-ip, 0], [0, -ip], [ip, 0]];
exp.forEach(([a, b], k) => { const s = at({ power: 1, enPin: 0, n: k * m }); close(s.iA, a); close(s.iB, b); });

// One full step = 1.8 deg on the rotor; 200 full steps = one rev.
close(at({ power: 1, enPin: 0, n: m }).deg.mech, 1.8);
close(at({ power: 1, enPin: 0, n: 200 * m }).deg.mech, 360);

// DIR reversal: stepping back retraces the same currents.
const f = at({ power: 1, enPin: 0, n: 5 }), b = at({ power: 1, enPin: 0, n: 4 + 1 });
close(f.iA, b.iA); close(at({ power: 1, enPin: 0, n: -m }).iB, -ip);

// Bridge and pole polarity follow the current sign.
const s0 = at({ power: 1, enPin: 0, n: 0 });
assert.deepStrictEqual(s0.bridgeA, [1, 0, 0, 1]);
assert.strictEqual(s0.poles['A+'], 'S'); assert.strictEqual(s0.poles['A-'], 'N');
assert.deepStrictEqual(at({ power: 1, enPin: 0, n: 2 * m }).bridgeA, [0, 1, 1, 0]);

// Vref 1.0 V -> 0.657 A RMS (AN-045 formula); pull-up current 2.2 mA when GPIO pulls EN low.
close(s0.irms, 0.657, 1e-3); close(s0.iPull, 0.0022);
// Supply current = 1.65 ohm * Ipk^2 / 12 V, smaller than the coil current.
close(s0.iSupply, 1.65 * s0.ipk ** 2 / 12); assert.ok(s0.iSupply < s0.ipk);
assert.strictEqual(at({ power: 0, enPin: 0, n: 0 }).iPull, 0);
console.log('sim ok');
