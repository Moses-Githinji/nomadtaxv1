# Supabase Setup - Quick Start

## ⚠️ Action Required: Configure Supabase Credentials

Your app won't run until you set up Supabase. Here's how:

### Step 1: Create/Access Your Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Sign in or create an account
3. Click **New Project** or select existing project

### Step 2: Get Your API Credentials

1. In your project, go to **Settings** (gear icon) → **API**
2. You'll see two important values:
   - **Project URL** (e.g., `https://abcdefghijk.supabase.co`)
   - **anon public** key (under "Project API keys")

### Step 3: Update Your .env File

1. Open `.env` in the root of your project
2. Replace the placeholder values:

```env
VITE_SUPABASE_URL=https://your-actual-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

3. Save the file
4. Restart your dev server: `npm run dev`

### Step 4: Run Database Migrations

Follow the instructions in `supabase/README.md` to create the database tables.

---

## ✅ Verify Setup

Once configured, the error should disappear and you'll be able to:
- Sign up new users
- Log in with email/password
- Use Google/Facebook login (after OAuth setup)

---

## 🆘 Still Having Issues?

**Error: "Invalid supabaseUrl"**
- Make sure URL starts with `https://`
- No trailing slashes
- Format: `https://projectref.supabase.co`

**Error: "Invalid API key"**
- Use the **anon public** key, not the service_role key
- Copy the entire key (they're long!)

**Need Help?**
- Check `supabase/OAUTH_SETUP_GUIDE.md` for OAuth setup
- See `supabase/README.md` for database migrations
