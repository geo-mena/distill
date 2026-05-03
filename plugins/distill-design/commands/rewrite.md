---
description: Rewrite text in the Distill voice — first-person plural, no superlatives, no emoji, sentence case.
---
Load the distill-design skill, then rewrite the text in $@ in the Distill editorial voice.

Workflow:

1. Read `plugins/distill-design/DESIGN-SYSTEM.md` § "Content fundamentals" before rewriting. The canonical voice paragraph is in that section — match its register exactly.
2. Identify what kind of text the input is: heading, caption, body paragraph, abstract, docstring, button label, error message. The voice rules apply differently to each (captions describe what to look at, headings are sentence-case, button labels stay short and verb-led).
3. Rewrite once. Then read your output against the rules below and revise. Then output.
4. Return only the rewritten text — no preamble, no explanation, unless the user explicitly asks for a diff or rationale. If you had to drop or change technical content (not just style), surface that in one line after the rewrite, prefixed `Note:`.

Voice rules (apply all):

- First-person plural ("we") for narration. The "we" includes the reader, not the royal we. Second person ("you") only when addressing reader actions.
- Active voice, present tense for explanations. Math verbs get verbed: "dot producted", "softmaxed", "embedded".
- Sentence case for headings. Title case only for proper nouns and named methods (FiLM, Neural Turing Machine, GRU, Transformer).
- Bold inline only for term-introduction (first appearance of a key term). Not for emphasis.
- Captions describe what to look at, not what to conclude. "Blue shows high similarity, pink high dissimilarity" — not "The model clearly prefers blue regions".
- Variables italicized inline (`*x*`, `*z*`, `*W*`); code identifiers stay upright in mono.

Things to drop on sight:

- Emoji. Every emoji codepoint, including pointers, sparkles, checkmarks, arrows. The only sanctioned glyph in the visual system is the orange-circle-with-pointing-hand `PointerGlyph` for interactive affordances — and it is never an emoji codepoint.
- Marketing superlatives: "revolutionary", "powerful", "robust", "comprehensive", "elegant", "seamless", "cutting-edge", "state-of-the-art", "game-changing", "blazing-fast", "next-generation", "world-class".
- Empty value adjectives that describe nothing measurable: drop them or replace with a measured fact ("3× faster than the baseline" beats "much faster").
- Hedging adverbs: "very", "really", "quite", "incredibly", "extremely". If something is large, say how large.
- Exclamation points in body prose. Never. Acceptable only inside a quoted string from another source.
- Contractions in formal sections (body prose). Acceptable in figure annotations and conversational asides.
- "Let's" as a paragraph opener. Replace with "We" + active verb.
- Year literals if the text is not specifically dating a paper (e.g. drop "in 2024" if the surrounding context doesn't depend on the year). Substitute "now-archived", "modern", "earlier" where appropriate. Year literals stay in `CHANGELOG.md`-style date provenance.
- Em-dash overuse (`—`) clustered into lists; the original Distill voice uses em-dashes for asides, not for bullet substitutes.

Things to preserve:

- Technical content. Do not simplify math for "accessibility" — density is part of the identity.
- Greek letters and operator glyphs (γ, β, ⊙, →, Σ, ←). Typeset, do not describe.
- Cited references and equation numbers. Renumber only if the user asked for a structural change.
- The user's domain terminology. If they wrote "key-value cache", do not rewrite to "memory store".

Hard constraints (non-negotiable):

- English only. If the input is in another language, ask before translating; default to keeping the input language unless the user said "translate to English".
- No emoji in the output.

Verification:

- Read your rewrite back against the canonical paragraph in DESIGN-SYSTEM.md § "Content fundamentals". If your rewrite reads more like marketing copy than that paragraph, redo it.
- For diagram captions specifically, verify it answers "what to look at", not "what to conclude".
