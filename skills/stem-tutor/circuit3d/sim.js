// Stepper drive model: STEP/DIR/EN driver (TMC2208, A4988, DRV8825 class) + 2-phase hybrid stepper.
// Pure functions, no three.js. One input drives everything: the microstep counter n.
// Sources: TMC2208 datasheet (Trinamic/ADI) — STEP/DIR interface, sine-wave microstep table, EN active low;
// ADI app note AN-045 — I_RMS = 0.325 V / (Rsense + 0.03 ohm) / sqrt2 * Vref / 2.5 V; Rsense 0.11 ohm (BTT module);
// seller data for 17HS15-1684S-PG27 (not re-checked) — 1.8 deg/full step, 1.68 A, ~1.65 ohm, gear 26 103/121 : 1.
(function (g) {
  const TAU = 2 * Math.PI;
  const DEF = {
    micro: 8,            // microsteps per full step (TMC2208 MS1/MS2 open = 1/8)
    vref: 1.0,           // V on the Vref pot
    vm: 12,              // V motor supply
    v3: 3.3,             // V logic
    rPull: 1500,
    rSense: 0.11,        // ohm on the BTT TMC2208 V3.0         // ohm pull-up on EN
    rPhase: 1.65,        // ohm per phase (17HS15-1684S)
    rotorTeeth: 50,      // hybrid rotor: 50 teeth -> 200 full steps / rev
    gear: 26 + 103 / 121 // PG27 planetary gearbox
  };
  // cfg: {power, enPin (GPIO level 0/1 or null = floating -> pull-up HIGH), dir, n}
  function at(cfg, p = DEF) {
    p = Object.assign({}, DEF, p);
    const enLevel = cfg.enPin == null ? 1 : cfg.enPin;          // pull-up makes floating EN HIGH
    const enabled = !!cfg.power && enLevel === 0;               // EN is active LOW
    const irms = 0.325 / (p.rSense + 0.03) / Math.SQRT2 * p.vref / 2.5;
    const ipk = irms * Math.SQRT2;
    const thE = cfg.n * (Math.PI / 2) / p.micro;                // one full step = 90 deg electrical
    const iA = enabled ? ipk * Math.cos(thE) : 0;
    const iB = enabled ? ipk * Math.sin(thE) : 0;
    const mech = thE / p.rotorTeeth;                            // real rotor angle (rad)
    const out = mech / p.gear;                                  // gearbox output (rad)
    // H-bridge: positive current = high-side 1 + low-side 2 on. 0 = all off.
    const hb = i => Math.abs(i) < 1e-9 ? [0, 0, 0, 0] : i > 0 ? [1, 0, 0, 1] : [0, 1, 1, 0]; // [HS1,LS1,HS2,LS2]
    // Teaching stator (4 poles: A+ at 0 deg, B+ at 90, A- at 180, B- at 270).
    // Rotor N points along field (iA, iB). The stator pole it faces shows S at its face.
    const pole = i => Math.abs(i) < 1e-9 ? '' : i > 0 ? 'S' : 'N';
    return {
      enabled, enLevel, irms, ipk, thE, iA, iB, mech, out,
      fieldOn: enabled, fieldAng: Math.atan2(iB, iA),
      bridgeA: hb(iA), bridgeB: hb(iB),
      poles: { 'A+': pole(iA), 'A-': pole(-iA), 'B+': pole(iB), 'B-': pole(-iB) },
      iPull: cfg.power && cfg.enPin === 0 ? p.v3 / p.rPull : 0,   // A: 3V3 -> pull-up -> GPIO (LOW) -> Pi GND
      // Supply current from power balance (losses ignored): the chopper makes it smaller than the coil current.
      iSupply: enabled ? p.rPhase * (iA * iA + iB * iB) / p.vm : 0,
      seqIndex: ((cfg.n % (4 * p.micro)) + 4 * p.micro) % (4 * p.micro),
      deg: { thE: thE * 360 / TAU, mech: mech * 360 / TAU, out: out * 360 / TAU }
    };
  }
  const S = { at, DEF };
  if (typeof module !== 'undefined') module.exports = S; else g.StepSim = S;
})(this);
