export default {
  "*.{js,ts,tsx,jsx,json,md}": ["cd client && pnpm run validate && cd .. && cd primary-backend && pnpm run validate"],
};
