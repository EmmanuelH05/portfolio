# Portfolio redesign: Sage

Date: 2026-09-10
Status: design approved in the brainstorm (mockup `sage-motion.html`). Built on branch `redesign/sage`.

## Goal

Make the portfolio read as handmade instead of AI-generated, for recruiters hiring summer 2027 interns.

## Decisions

- Layout follows mockup direction A (after biancavillamor.me). A serif name mark and a plain nav sit inside a rounded shell. The hero has two body-size paragraphs, a resume pill, an email link, and a framed photo with an "Open to summer 2027 internships" badge. "Selected work" follows as full-width tinted panels.
- No display-size hero text anywhere. The largest type is the 44px serif section heading.
- Palette "Sage":
  - ground #E6EAE1, shell #F4F6F0, ink #172019, muted #56615A, accent #2F6B4F, button #1F3A2C
  - SwipeBite tint #EFE5D6, DIDUC tint #DCE6E1
  - The mockup's lighter meta color (#7F897F) is dropped. It measured 2.8 to 3.3:1, and any shade that passes WCAG AA at 12px is indistinguishable from muted, so meta text uses muted.
- Type: Instrument Serif for headings and the name, Instrument Sans for body text, Fragment Mono for meta lines. All three load once through next/font. The old Google Fonts `@import` is gone.
- Motion is scroll-linked and reversible, and each piece is tied to its content. Nothing fades or slides in on enter.
  - The hero photo drifts inside its frame.
  - The rule under each home section heading draws out from the center.
  - SwipeBite: the top card swipes off and the next card straightens up.
  - DIDUC: three screens fan out from one stack.
  - Remeshing: the triangle mesh relaxes as you scroll. The frames come from a real spring and damping simulation, precomputed with semi-implicit Euler steps.
  - Project pages: a sticky phone swaps screens as each caption crosses the middle of the viewport.
  - Everything uses framer-motion (already a dependency), so it works in Safari and Firefox. With `prefers-reduced-motion`, every piece renders its finished, static state.
- Copy: no em dashes. Keep the user's own writing, including the soccer and ACL story, which becomes "The longer version" section. New lines stay short and plain, and the user approves every line.

## Structure

| Route | What it is |
|---|---|
| `/` | Hero, Selected work, Research, Experience, The longer version, contact footer |
| `/projects/swipebite`, `/projects/diduc` | Project pages from one template (`projects/[slug]`) |
| `/research/ai-anesthesiology`, `/research/remeshing` | Paper pages from one template (`research/[slug]`) |
| `/about`, `/contact`, `/projects`, `/experience`, `/research` | Temporary (307) redirects to the matching home section |

Content lives in `src/lib/`:

- `data.ts`: resume facts and the story
- `projects.ts`: project pages
- `research.ts`: paper pages

Pages are server components. Only the motion pieces are client components.

## Privacy

The phone number is removed from the data, so it no longer appears in the page or the JS bundle. Contact is email, GitHub, and LinkedIn.

## Open items for the user

- **Resume PDF:** drop it at `public/resume.pdf`. Until that file exists, "Read my resume" links to the Experience section.
- **DIDUC team size:** the resume says a 4-person team; the old project page said 5. The site uses 4.
- **Model name:** the anesthesiology poster says ChatGPT 4o, but the old page said GPT-4. The site uses GPT-4o.
- **SwipeBite chip:** confirm "Solo, full stack" is accurate.

## Verification

- `bun test` covers two things:
  - Content: no em dashes in `src/`, and every referenced file exists in `public/`.
  - Mesh simulation: it starts distorted and settles, boundary points never move, no triangle flips, and every value stays finite.
- `bun run build` passes.
- Every route returns 200, and every redirect returns 307 to the right anchor.
- Visual check in Chrome at desktop and phone widths.
