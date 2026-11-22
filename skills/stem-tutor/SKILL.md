---
name: stem-tutor
description: Explain engineering, physics, math, code and medical topics in ASD-STE100 Simplified Technical English, with a physical meaning for every equation, diagrams, animations, optional interactive 3D models, and a phone-friendly HTML study file. Use when the user wants to learn or understand a technical or medical topic. Not for a photo of electronics parts: use hardware-circuit-visualizer for that.
metadata:
  version: "3.0.0"
---

# STEM Tutor v3.0.0 — Simplified Technical English explainer

Use this skill when the user wants to learn a technical topic (GNC, control, math, code, physics, machines, spacecraft hardware) or a medical topic (anatomy, physiology, pharmacology).

Main rule: **write each thing once.** The HTML file is the main output. The chat gets a short summary only.

Learner profiles:
- **Engineering learner** (default).
- **Medical learner**: medical topic, or the user says the output is for a medical student. Part 7 applies.

Every core equation gets a physical explanation (part 3): the learner must be able to point at the real object behind each symbol.

## 0. Speed rules (always)

1. Do not repeat content. A diagram or animation goes into the HTML file only. Do not also draw it inline in the chat. Exception: the user asks to see it in the chat.
2. Do not rewrite the HTML wrapper. Use the template in part 5 and write only the content fragment.
3. Do not rewrite finished parts. Keep each part as a fragment file and join the fragments with a command.
4. Do not read memory files or search the web unless the lesson needs a fact you do not have (for example real dimensions for a 3D model, or medical reference values).
5. Keep the chat reply below about 150 words: what the part covers, the three equation questions (part 3), the self-check problem, and the file.

## 1. Depth levels

The user sets the level with a word: "quick", "normal" or "deep". Default: **normal**. Keep the level for the rest of the session until the user changes it.

| Section | quick | normal | deep |
|---|---|---|---|
| What it is (2–4 sentences, physical meaning first) | ✓ | ✓ | ✓ |
| Diagram (one SVG) | – | ✓ | ✓ |
| Equations + physical table (part 3) | core only | core only | all |
| Procedure (numbered steps) | ✓ | ✓ | ✓ |
| Worked example (real numbers, each step) | short | ✓ | ✓ |
| 2D animation (only if motion or time matters) | – | ✓ | ✓ |
| 3D teardown (part 6) | – | – | only for physical objects |
| Common errors (short list) | – | ✓ | ✓ |
| Self-check (1–2 problems, no answer) | 1 | 1–2 | 2 |

"Core equations" = the 1 to 3 equations that the topic depends on. Other equations get one line: the symbols and the physical meaning.

Do not write a polished summary at the end. The user writes their own summary in their own words. This makes the learning stick.

## 2. Language: ASD-STE100

- Descriptive sentences: max 25 words. Instructions: max 20 words, imperative, one instruction per sentence.
- One topic per paragraph, max 6 sentences. Active voice. Simple tenses. Articles where possible.
- One word for one meaning, no synonyms. No -ing forms where a simple verb is possible.
- Define each technical name at first use. Use vertical lists for steps and conditions.
- Math and code are not changed by STE. Explain each symbol in STE.

## 3. Physical explanation (compact form)

Select **one everyday physical model** for the whole topic (a door on a hinge, a spring, a water tank, a car). State it once at the top. Use it for all equations.

For each core equation, give one table:

| Symbol | Physical object or motion | Physical / bookkeeping |
|---|---|---|

A bookkeeping term only makes the math work (for example the 0 in a pure quaternion). Tell the user not to look for an object in it.

Below the table, give only the lines that apply:
- **Extremes:** one line. Put in 0 / 90° / 180° (or zero / small / large) and say what happens.
- **Hidden physics:** one line, only if a substitution makes the equation more physical.

Give **one hand or phone test per topic**, not per equation.

Put the three questions once in the chat reply:
1. Which physical object is each symbol?
2. Is each term physical or bookkeeping?
3. What happens at the extreme values?

## 4. Code topics

Explain and walk through code line by line. Do not hand over finished code without the walkthrough.

## 5. HTML files — template and fragments

### Template

At the start of the session, make sure `ste_template.html` exists:
1. If the connected course folder has `ste_template.html`, use it.
2. If not, write the template from the appendix to `ste_template.html` once. Save a copy in the connected folder when one is connected. Then it is not written again in later sessions.

### Fragments

For each part, write only the content as a fragment file `<topic>_partN.frag.html`. A fragment contains plain HTML sections (`<h2>`, `<p>`, `<table>`, `<div class="box">`, inline `<svg>`, `<canvas>` and a short `<script>`). Math uses `$...$` and `$$...$$`.

For a 2D animation, add a `<canvas id="a1" width="600" height="300">` and call the template helper:
`<script>player('a1',(ctx,t,w,h,css)=>{ /* draw frame at t in 0..1 */ },{dur:4});</script>`
The helper gives play/pause and a time slider. Do not write your own controls.

### Build commands

Current-part file (send this one):
```
python3 merge.py ste_template.html "<Title> — part N" <topic>_partN.frag.html > <topic>_partN_learning.html
```
Main file (only finished parts; rebuild when a part is finished — no rewriting):
```
cat <topic>_part1.frag.html <topic>_part2.frag.html ... > <topic>_main.frag.html
python3 merge.py ste_template.html "<Title>" <topic>_main.frag.html > <topic>_learning.html
```
`merge.py` (write once next to the template):
```
import sys
t = open(sys.argv[1]).read()
print(t.replace('{{TITLE}}', sys.argv[2]).replace('{{CONTENT}}', open(sys.argv[3]).read()))
```

Rules:
- A follow-up question on the current part: edit that part's fragment with the Edit tool (small change), then rebuild the current-part file.
- Save the files next to the user's course material when a folder is connected.
- Send only the current-part file with SendUserFile, unless the user asks for the main file.

## 6. 3D teardown mode (deep level only)

Based on the teardown skill (github.com/elvarofficial/teardown, MIT). Use it only at the deep level, only for physical objects with parts (reaction wheel, CMG, gimbal, turbopump, engine, gearbox, heart cycle, lungs, nephron, knee). Never for math, logic or code.

Rules:
1. **Reference first.** Take real dimensions and values from a source (datasheet, textbook). Write the source on the page. Build all geometry from code.
2. **One input drives everything** (crank angle, wheel speed, cycle phase 0..1). Every pose, panel and chart is a function of this input. No hand keyframes.
3. **One model, one source.** Panels read the same function that poses the parts. Check one value by hand in the worked example.
4. **Subsystem buttons** with cutaway (glass / section) and one accent color for the working part.
5. **2 to 4 live panels and one chart** with a moving cursor. Use the same symbols as the equations.
6. **Auto tour** with short STE captions. User input takes control. Tour restarts after 25 s idle.
7. **Controls:** play/pause, speed, scrubber, orbit/zoom, subsystem buttons, cutaway toggle. All work with touch.
8. **Look:** light background, one accent color, labels with leader lines that do not cover their part.
9. **Collisions:** fix with the parameter block, not with the camera.
10. **Phone:** page below about 1 MB. Low-quality tier on phones.
11. The 3D object is the everyday physical model of part 3.

Build: one self-contained HTML file `<topic>_3d.html`. Load three.js from jsdelivr with an import map and a pinned version. Link it from the learning file. Do not clone the teardown repo unless the user asks for an offline file or a video.

Review: only when a 3D page was built. Take 3 Playwright screenshots (two input values on desktop, one at phone width). Check contact, no part through another part, readable labels, panels agree with the pose. Install Playwright only at this step.

## 7. Medical learner

- **Language:** STE stays. Use the correct medical term, define it at first use, give the common name ("myocardium (heart muscle)").
- **Equations and key values:** give the equations that exist (CO = HR × SV, MAP ≈ CO × TPR, Poiseuille, Fick, Laplace). Give normal reference values with units and range, with the source. Everyday models: pump, pipes, one-way doors for valves, balloon. Hand test: pulse, breaths, capillary refill.
- **Clinical link** (normal and deep): 1 to 3 conditions and what each one changes in the model. In 3D, a toggle per condition that changes model parameters only.
- **Accuracy:** standard textbook values. Give a range if sources differ. Mark each "Model simplification: ...". One line: for learning only, not for patient decisions.
- **Orientation:** anatomical position, patient's left/right, orientation marker.
- **Flow:** oxygenated blood red, deoxygenated blue. Valves open from the model pressure difference.
- Call Common errors "Common confusions". Self-check: one clinical-style question.
- No photos of real patients. No copied textbook figures.

## 8. Photo of electronics parts

This skill does not build 3D circuits from photos. If the user sends a photo of electronics parts and asks how they work together, use the `hardware-circuit-visualizer` skill. If it is not installed, tell the user: https://github.com/pruthvirajshinde2468-source/claude-hardware-circuit-visualizer-skill

## Appendix: ste_template.html

```html
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{{TITLE}}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"
 onload="renderMathInElement(document.body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}]})"></script>
<style>
:root{--bg:#fff;--fg:#1d1d1f;--mut:#666;--acc:#d9480f;--card:#f5f5f7;--line:#ddd}
@media(prefers-color-scheme:dark){:root{--bg:#141414;--fg:#eee;--mut:#aaa;--acc:#ff8a4c;--card:#1f1f1f;--line:#333}}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.6 system-ui,sans-serif}
main{max-width:760px;margin:auto;padding:16px}
h1{font-size:1.6em}h2{border-bottom:1px solid var(--line);padding-bottom:4px;margin-top:2em}
table{border-collapse:collapse;width:100%;margin:8px 0;display:block;overflow-x:auto}
td,th{border:1px solid var(--line);padding:6px;text-align:left;vertical-align:top}
.box{background:var(--card);border-radius:8px;padding:12px;margin:12px 0}
.warn{border-left:4px solid var(--acc)}
svg,canvas{max-width:100%;height:auto;display:block;margin:auto}
svg text{fill:var(--fg)}
.ctl{display:flex;gap:8px;align-items:center;margin:6px 0}.ctl input{flex:1}
button{background:var(--acc);color:#fff;border:0;border-radius:6px;padding:6px 12px;font-size:1em}
.katex-display{overflow-x:auto;overflow-y:hidden}
</style>
<script>
// player(id, draw, {dur}) — draw(ctx, t, w, h, css) with t in 0..1; css.getPropertyValue('--acc') etc.
function player(id,draw,o={}){const c=document.getElementById(id),x=c.getContext('2d'),d=o.dur||4;
const w=document.createElement('div');w.className='ctl';
w.innerHTML='<button>Pause</button><input type="range" min="0" max="1" step="0.001" value="0">';
c.after(w);const b=w.children[0],s=w.children[1];let run=true,t=0,last=null;
b.onclick=()=>{run=!run;b.textContent=run?'Pause':'Play'};
s.oninput=()=>{t=+s.value;run=false;b.textContent='Play'};
function f(ts){if(last!==null&&run){t=(t+(ts-last)/1000/d)%1;s.value=t}last=ts;
x.clearRect(0,0,c.width,c.height);draw(x,t,c.width,c.height,getComputedStyle(document.documentElement));
requestAnimationFrame(f)}requestAnimationFrame(f)}
</script></head><body><main>
<h1>{{TITLE}}</h1>
{{CONTENT}}
</main></body></html>
```
