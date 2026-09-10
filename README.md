# Emmanuel Hernandez, portfolio

My portfolio: selected work, research, and experience. Built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion.

## Running it

```bash
bun install
bun run dev      # http://localhost:3000
bun run build
bun test         # copy checks and the mesh simulation
```

## Where things live

- `src/lib/data.ts`: resume facts, experience, and "The longer version" on the home page
- `src/lib/projects.ts`: the SwipeBite and DIDUC pages
- `src/lib/research.ts`: the two research pages
- `src/lib/mesh.ts`: the spring simulation behind the remeshing drawing
- `src/components/motion/`: the scroll-linked pieces (photo drift, card swipe, screen fan, mesh relaxation)
- `public/resume.pdf`: add this file and "Read my resume" starts opening it

Old routes (`/about`, `/contact`, `/projects`, `/experience`, `/research`) redirect to sections of the home page; see `next.config.js`.

## Author

**Emmanuel Hernandez**
- Email: 05mannyhernandez@gmail.com
- LinkedIn: [linkedin.com/in/05manny](https://linkedin.com/in/05manny)
- GitHub: [github.com/EmmanuelH05](https://github.com/EmmanuelH05)
