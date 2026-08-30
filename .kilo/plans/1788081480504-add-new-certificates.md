# Add 5 New Certificates to the Portfolio

## Context
The user placed 5 new certificate images in `New folder/` at the project root:
- `Nima Hasani-MK-A1MUMO (1).png`
- `Nima Hasani-MK-AGDYUD (1).png`
- `Nima Hasani-MK-FW26MR (1).png`
- `Nima Hasani-MK-KMZNSA (1).png`
- `Nima Hasani-MK-OUVXY9 (1).png`

These follow the same Maktabkhooneh pattern as the existing 3 certificates. They must be added to the **Certificates** section ("بخش مدارک") using the exact same format already built.

The section is data-driven:
- Data model: `src/data/certificates.ts` (`Certificate` type)
- Render component: `src/app/components/Certificates.tsx`
- Images live in `public/certificates/` (current: `icdl.png`, `project-based-css-html-js.png`, `react-js-basics.png`)

## Certificate type (required fields)
```ts
{ title: { fa: string; en: string }; issuer: string; hours: number; instructor: string; date: string; verifyUrl: string; image: string; }
```
`issuer` and `verifyUrl` can be auto-derived; `title`, `hours`, `instructor`, `date` must be supplied by the user (the model cannot read the image contents).

## Steps
1. **Copy & rename images** into `public/certificates/`, using clean lowercase filenames derived from each MK code (avoid spaces/`(1)`):
   - `mk-a1mumo.png`
   - `mk-agdyud.png`
   - `mk-fw26mr.png`
   - `mk-kmznsa.png`
   - `mk-ouvxy9.png`
2. **Append 5 entries** to the `certificates` array in `src/data/certificates.ts`. For each:
   - `issuer`: `"Maktabkhooneh"`
   - `verifyUrl`: `https://maktabkhooneh.org/certificates/MK-<CODE>/` (CODE = `A1MUMO`, `AGDYUD`, `FW26MR`, `KMZNSA`, `OUVXY9`)
   - `image`: `"/certificates/mk-<code>.png"`
   - `title`, `hours`, `instructor`, `date`: fill from the user-provided details (see Open Question).
3. **Verify** the grid renders: `npm run build` (or `npm run dev`) and confirm no type/lint errors and the 5 new cards appear.

## Open Question (user-provided)
For each of the 5 certificates, the user will supply: `title` (Persian + English), `hours`, `instructor`, `date`. Until provided, leave those fields with temporary TODO placeholders and do not finalize the build.

## Files
- `public/certificates/` (new image files)
- `src/data/certificates.ts` (data edits only — no component change needed; it already maps over the array)
