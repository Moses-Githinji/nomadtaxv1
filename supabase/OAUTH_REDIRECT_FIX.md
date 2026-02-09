# Fix: Google OAuth Redirecting to Port 3000

## Problem
Google Sign In is redirecting to `http://localhost:3000` instead of `http://localhost:5173`

## Solution

### Step 1: Update Supabase Site URL

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Authentication** → **URL Configuration**
4. Update the following:

**Site URL:**
```
http://localhost:5173
```

**Redirect URLs:** (Add all these)
```
http://localhost:5173/**
http://localhost:5173/dashboard
https://apiarian-terrence-blissful.ngrok-free.dev/**
```

5. Click **Save**

### Step 2: Verify OAuth Redirect in Code

The redirect is already correctly configured in your code:
```typescript
redirectTo: `${window.location.origin}/dashboard`
```

This dynamically uses your current origin, so it should work for both localhost:5173 and ngrok URLs.

### Step 3: Restart Dev Server

After updating Supabase settings:
1. Stop dev server (`Ctrl+C`)
2. Restart: `npm run dev`
3. Clear browser cache or use incognito
4. Try Google Sign In again

## Why This Happens

Supabase defaults to `http://localhost:3000` (Next.js default port). Since you're using Vite (port 5173), you need to explicitly update this in the Supabase dashboard.

## Testing

1. Click "Sign in with Google"
2. After Google authentication, you should be redirected to:
   - `http://localhost:5173/dashboard` (if using localhost)
   - `https://your-ngrok-url.ngrok-free.dev/dashboard` (if using ngrok)

## Alternative Quick Fix

If you want to keep testing immediately without waiting for Supabase settings to propagate, you can temporarily add an explicit redirectTo:

```typescript
const { error } = await supabase.auth.signInWithOAuth({
  provider: provider,
  options: {
    redirectTo: 'http://localhost:5173/dashboard'
  }
});
```

But the proper fix is updating the Supabase dashboard settings.
