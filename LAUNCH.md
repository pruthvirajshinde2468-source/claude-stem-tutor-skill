# STEM Tutor — launch brief

| | |
|---|---|
| **Current version** | **v3.0.0** (2026-11-22) |
| **Repo** | https://github.com/pruthvirajshinde2468-source/claude-stem-tutor-skill |
| **Download** | [stem-tutor-v3.0.0.zip](https://github.com/pruthvirajshinde2468-source/claude-stem-tutor-skill/releases/download/v3.0.0/stem-tutor-v3.0.0.zip) ([release page](https://github.com/pruthvirajshinde2468-source/claude-stem-tutor-skill/releases/tag/v3.0.0)) |
| **Live demos** | [All examples](https://pruthvirajshinde2468-source.github.io/claude-stem-tutor-skill/) · [Heart 3D](https://pruthvirajshinde2468-source.github.io/claude-stem-tutor-skill/heart.html) |
| **License** | MIT, free |

## One line

A free AI tutor skill that explains engineering, physics, math, code and medicine in Simplified Technical English. It gives every equation a physical meaning, with diagrams, animations and 3D models.

The photo → 3D circuit feature is now its own skill: [Hardware Circuit Visualizer](https://github.com/pruthvirajshinde2468-source/claude-hardware-circuit-visualizer-skill).

## What's new

| Version | What changed |
|---|---|
| **v3.0.0** | **Split.** The photo → 3D circuit lab moved to its own skill, [hardware-circuit-visualizer](https://github.com/pruthvirajshinde2468-source/claude-hardware-circuit-visualizer-skill). STEM Tutor is now only the STE learning tutor. |
| **v2.0.0** | **Photo → 3D circuit lab.** Send a photo of parts (Raspberry Pi, stepper driver, motor, power supply). You get a 3D bench: power switch, animated current in every wire, see-through layers, the inside of the driver chip and motor, live values and a timing chart. |
| **v2.1.0** | **Works with any AI.** The whole skill is one prompt for ChatGPT, Gemini, Copilot and others. Those AIs write a short scene file; the hosted circuit-lab page turns it into the 3D model, with a link you can share. Version numbers and a CHANGELOG were added. |
| **v2.1.1** | The README picture now shows the 3D stepper circuit. No change to the skill. |
| **v2.1.2** | **Security fix.** Text from a shared 3D-lab link is shown as plain text, so a bad link cannot run code. |
| **v2.1.3** | **Phone view.** On a portrait phone the 3D bench fills the screen from top to bottom, and the labels no longer overlap. |

## The 3 best features

1. **A physical meaning for every equation.** Each symbol is linked to a real object, "bookkeeping" terms are marked, and extreme values are tested. Students see the equation instead of memorising it.
2. **Interactive 3D teardowns.** Reaction wheels, gearboxes, the heart: one input drives the model, the live numbers and the chart, so they always agree.
3. **One phone-friendly HTML file, from any AI.** Clear Simplified Technical English, KaTeX math, diagrams and animations. It works in Claude (as a skill) and in ChatGPT, Gemini and other AIs (as a prompt).

## Who it's for

- Engineering and physics students: control, GNC, mechanics, electronics, signals.
- Medical students: anatomy and physiology, with reference values and clinical links.
- Learners who use English as a second language: short sentences, one word for one meaning.
- Teachers who want a shareable, interactive explanation.

## Known limits

- **Not yet tested end to end:** the portable prompt inside ChatGPT or Gemini.
- **Needs internet:** the 3D pages and the math load three.js and KaTeX from a CDN.
- **For learning only:** the medical mode is not for patient decisions.

## How to install

- **Claude.ai:** Settings → Customize → Skills → Add → Upload skill, then pick the zip.
- **Claude Code:** unzip into `~/.claude/skills/`.
- **ChatGPT / Gemini / others:** paste [`portable/STEM-TUTOR-PROMPT.md`](portable/STEM-TUTOR-PROMPT.md) into a Custom GPT, a Gem, or the first message.
