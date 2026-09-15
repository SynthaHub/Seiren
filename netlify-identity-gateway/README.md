# CMS sign-in (Netlify Identity + Git Gateway)

Lets the site owner log into `/admin` with **just an email and a password**
— no GitHub account, no OAuth screen, nothing GitHub-shaped ever visible to
them. This is the standard Decap CMS pattern for a non-technical editor.

How it fits together: the site itself stays on HostAfrica. This folder is a
tiny, separate site deployed to Netlify's free tier purely to host two
services Netlify provides — **Identity** (email/password accounts, invites)
and **Git Gateway** (a proxy that turns Identity logins into GitHub commits
on your behalf, so nobody but you ever needs a GitHub token). `/admin` on the
real site talks to this Netlify site's Identity/Gateway endpoints instead of
GitHub directly — see `backend.identity_url` / `backend.gateway_url` in
`public/admin/config.yml`.

## One-time setup

1. **Create a free Netlify account** (netlify.com) if you don't have one —
   this is your account, not the owner's; they never log into Netlify.

2. **Import this repo as a Netlify site**: Netlify dashboard → "Add new
   site" → "Import an existing project" → connect `SynthaHub/Seiren`.
   - Base directory: `netlify-identity-gateway`
   - Build command: (leave empty)
   - Publish directory: `netlify-identity-gateway`

   This site's own deploy doesn't matter and isn't what visitors see — it
   exists only for the Identity/Git Gateway API endpoints Netlify attaches
   to it. Note the site's URL (`https://<random-name>.netlify.app`, or set a
   custom subdomain in Site settings → Domain management).

3. **Enable Identity**: Site settings → Identity → "Enable Identity".
   Under Identity → Registration, set it to **Invite only** — this is what
   stops a stranger from signing themselves up.

4. **Enable Git Gateway**: Identity → Services → Git Gateway → "Enable Git
   Gateway". Authorize it with a GitHub account that has write access to
   `SynthaHub/Seiren` (your own account is fine — this is the one and only
   place a GitHub credential is needed, and it's yours, not the owner's).

5. **Update the redirect target**: in `index.html` in this folder, replace
   `PRODUCTION_ADMIN_URL` with the real production domain's `/admin/` path
   once that domain is decided (see the "Final domain" row in the main
   README). Redeploy this Netlify site after changing it.

6. **Point `/admin` at this gateway**: in `public/admin/config.yml`,
   set `backend.identity_url` and `backend.gateway_url` to
   `https://<your-netlify-site>.netlify.app/.netlify/identity` and
   `https://<your-netlify-site>.netlify.app/.netlify/git`.

7. **Invite the owner**: Identity → Invite users → their email address. They
   get an email, click the link, land on this gateway page, get bounced to
   `/admin/`, set a password, and are in — no GitHub, no git, no code.
