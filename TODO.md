# Vercel Deployment Fix - TODO Steps

## Completed:
- [x] Updated frontend/package.json: Changed build script to `vite build`, added `type-check` script
- [x] Created frontend/vercel.json: Configures build/output for Vercel monorepo

## Remaining:
- [ ] Test locally: `cd frontend && npm install && npm run build` (verify dist/ folder created)
- [ ] Deploy: Push to Git, set Vercel project root directory to `frontend`
- [ ] Optional: Run `npm run type-check` locally to find/fix any strict TS issues
- [ ] Mark complete once Vercel deployment succeeds


