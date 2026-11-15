# STEM Tutor — launch brief

| | |
|---|---|
| **Current version** | **v2.1.2** (2026-11-14) |
| **Repo** | https://github.com/pruthvirajshinde2468-source/claude-stem-tutor-skill |
| **Download** | [stem-tutor-v2.1.2.zip](https://github.com/pruthvirajshinde2468-source/claude-stem-tutor-skill/releases/download/v2.1.2/stem-tutor-v2.1.2.zip) ([release page](https://github.com/pruthvirajshinde2468-source/claude-stem-tutor-skill/releases/tag/v2.1.2)) |
| **Live demos** | [All examples](https://pruthvirajshinde2468-source.github.io/claude-stem-tutor-skill/) · [3D stepper circuit](https://pruthvirajshinde2468-source.github.io/claude-stem-tutor-skill/stepper-circuit.html) · [3D circuit lab (paste from any AI)](https://pruthvirajshinde2468-source.github.io/claude-stem-tutor-skill/circuit-lab.html) · [Heart 3D](https://pruthvirajshinde2468-source.github.io/claude-stem-tutor-skill/heart.html) |
| **License** | MIT, free |

## One line

A free AI tutor skill that explains engineering, physics, math, code and medicine in Simplified Technical English. It gives every equation a physical meaning, and it turns a photo of electronics parts into a live 3D circuit.

## What's new in 2.x

| Version | What changed |
|---|---|
| **v2.0.0** | **Photo → 3D circuit lab.** Send a photo of parts (Raspberry Pi, stepper driver, motor, power supply). You get a 3D bench: power switch, animated current in every wire, see-through layers, the inside of the driver chip and motor, live values and a timing chart. |
| **v2.1.0** | **Works with any AI.** The whole skill is one prompt for ChatGPT, Gemini, Copilot and others. Those AIs write a short scene file; the hosted circuit-lab page turns it into the 3D model, with a link you can share. Version numbers and a CHANGELOG were added. |
| **v2.1.1** | The README picture now shows the 3D stepper circuit. No change to the skill. |
| **v2.1.2** | **Security fix.** Text from a shared 3D-lab link is shown as plain text, so a bad link cannot run code. |

## The 3 best features

1. **A physical meaning for every equation.** Each symbol is linked to a real object, "bookkeeping" terms are marked, and extreme values are tested. Students see the equation instead of memorising it.
2. **Photo → interactive 3D circuit.** Turn on the power, send EN/DIR/STEP and watch the current go through the H-bridges into the motor coils. One model drives the 3D view, the numbers and the chart, so they always agree.
3. **One phone-friendly HTML file, from any AI.** Clear Simplified Technical English, KaTeX math, diagrams and animations. It works in Claude (as a skill) and in ChatGPT, Gemini and other AIs (as a prompt).

## Who it's for

- Engineering and physics students: control, GNC, mechanics, electronics, signals.
- Makers and hobbyists who wire a Raspberry Pi, drivers and motors.
- Medical students: anatomy and physiology, with reference values and clinical links.
- Learners who use English as a second language: short sentences, one word for one meaning.
- Teachers who want a shareable, interactive explanation.

## Known limits

- **Small parts library for 3D:** Raspberry Pi 5, TMC2208 (BTT V3.0), NEMA 17 with gearbox, DC supply and resistor. Other parts (A4988, DRV8825, sensors) are shown as labelled closed boxes with no inside.
- **Simplified motor:** the rotor is drawn with 2 poles (a real NEMA 17 has 50 teeth). The page marks this as a simplification. The step angles and currents still come from the real model.
- **Not yet tested end to end:** a real user photo through the whole flow, and the portable prompt inside ChatGPT or Gemini.
- **Needs internet:** the 3D pages and the math load three.js and KaTeX from a CDN.
- **Phone view:** the 3D stepper model starts small and its labels overlap until you zoom in.
- **Data sources:** the motor values are seller data. The driver's 12/24 V rating comes from the BTT wiki, because the BTT manual could not be fetched.
- **For learning only:** check pin names on your real boards before you connect them. The medical mode is not for patient decisions.

## How to install

- **Claude.ai:** Settings → Customize → Skills → Add → Upload skill, then pick the zip.
- **Claude Code:** unzip into `~/.claude/skills/`.
- **ChatGPT / Gemini / others:** paste [`portable/STEM-TUTOR-PROMPT.md`](portable/STEM-TUTOR-PROMPT.md) into a Custom GPT, a Gem, or the first message.
