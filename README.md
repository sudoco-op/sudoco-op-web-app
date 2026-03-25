1. Create .env.development file and put `VITE_API_URL=http://localhost:5254` in there
(OPTIONAL) 1.1 Crate .env.production and change the api url for publishing
2. Run `npm run dev` for testing
(OPTIONAL) 3. For publishing run `npm run build` `npm start` `cloudflared tunnel login` `cloudflared tunnel run sudocoop-web-app`