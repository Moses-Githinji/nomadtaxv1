# OAuth Integration Guide: Google & Facebook with Supabase

Complete step-by-step guide to enable Google and Facebook authentication in your NomadTax application.

---

## 📋 Prerequisites

Before you begin:
- ✅ Active Supabase project
- ✅ Google Account (for Google Cloud Console)
- ✅ Facebook Account (for Meta Developers)
- ✅ Production domain OR localhost for testing

---

## 🔵 Part 1: Google OAuth Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a Project** → **New Project**
3. Enter project name: `NomadTax` (or your preferred name)
4. Click **Create**
5. Wait for project creation and select it

### Step 2: Configure OAuth Consent Screen

1. In left sidebar, go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** user type
3. Click **Create**
4. Fill in required fields:
   - **App name**: `NomadTax`
   - **User support email**: Your email
   - **Developer contact**: Your email
5. Click **Save and Continue**
6. **Scopes**: Click **Add or Remove Scopes**
   - Select: `email`, `profile`, `openid`
   - Click **Update** → **Save and Continue**
7. **Test users** (optional for development):
   - Add your email and test users
   - Click **Save and Continue**
8. Review and click **Back to Dashboard**

### Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **OAuth client ID**
3. Select **Application type**: `Web application`
4. **Name**: `NomadTax Web Client`
5. **Authorized JavaScript origins**:
   - Add: `http://localhost:5173` (for local dev)
   - Add: `https://yourdomain.com` (for production)
6. **Authorized redirect URIs**:
   - Add: `https://YOUR_SUPABASE_PROJECT.supabase.co/auth/v1/callback`
   
   > **How to find your Supabase URL:**
   > - Go to Supabase Dashboard → Settings → API
   > - Copy the **Project URL** (looks like `https://abcdefgh.supabase.co`)
   > - Add `/auth/v1/callback` to the end

7. Click **Create**
8. **Save these credentials** (you'll need them):
   - `Client ID` (looks like: `123456789-abc.apps.googleusercontent.com`)
   - `Client Secret` (looks like: `GOCSPX-...`)

### Step 4: Enable Google Provider in Supabase

1. Go to your **Supabase Dashboard**
2. Navigate to **Authentication** → **Providers**
3. Find **Google** in the list
4. Toggle **Enable Sign in with Google**
5. Paste your credentials:
   - **Client ID**: From Step 3
   - **Client Secret**: From Step 3
6. Click **Save**

---

## 📘 Part 2: Facebook OAuth Setup

### Step 1: Create Facebook App

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click **My Apps** → **Create App**
3. Choose use case: **Authenticate and request data from users with Facebook Login**
4. Click **Next**
5. Choose app type: **Consumer**
6. Fill in details:
   - **App name**: `NomadTax`
   - **App contact email**: Your email
7. Click **Create App**
8. Complete security check if prompted

### Step 2: Set Up Facebook Login

1. In your app dashboard, find **Facebook Login**
2. Click **Set Up** under **Facebook Login**
3. Choose **Web** as the platform
4. Enter your **Site URL**: 
   - `http://localhost:5173` (for dev)
   - OR `https://yourdomain.com` (for production)
5. Click **Save** → **Continue**

### Step 3: Configure OAuth Redirect URIs

1. In left sidebar, go to **Facebook Login** → **Settings**
2. Under **Valid OAuth Redirect URIs**, add:
   ```
   https://YOUR_SUPABASE_PROJECT.supabase.co/auth/v1/callback
   ```
   (Replace with your actual Supabase project URL)
3. Click **Save Changes**

### Step 4: Get App Credentials

1. Go to **Settings** → **Basic** in left sidebar
2. **Copy these values**:
   - **App ID** (e.g., `123456789012345`)
   - **App Secret** (click **Show** to reveal, e.g., `abc123...`)

### Step 5: Configure App for Production (When Ready)

For production use, you'll need to:
1. Go to **App Settings** → **Basic**
2. Add **Privacy Policy URL**
3. Add **Terms of Service URL** (optional)
4. Go to top of dashboard and switch from **Development** to **Live** mode
5. Complete **App Review** if required

### Step 6: Enable Facebook Provider in Supabase

1. Go to your **Supabase Dashboard**
2. Navigate to **Authentication** → **Providers**
3. Find **Facebook** in the list
4. Toggle **Enable Sign in with Facebook**
5. Paste your credentials:
   - **Facebook client ID**: App ID from Step 4
   - **Facebook client secret**: App Secret from Step 4
6. Click **Save**

---

## 🧪 Part 3: Testing OAuth Integration

### Test Google Login

1. Start your dev server: `npm run dev`
2. Navigate to `http://localhost:5173/auth`
3. Click the **Google** button
4. You should be redirected to Google login
5. After signing in, you'll be redirected back to your app
6. Check Supabase Dashboard → **Authentication** → **Users** to see the new user

### Test Facebook Login

1. On the auth page, click the **Facebook** button
2. Sign in with Facebook
3. Grant permissions
4. You'll be redirected back to your app
5. Verify the user appears in Supabase

### Check User Data

After successful OAuth login, you can fetch user data:

```typescript
import { supabase } from '@/lib/supabase';

// Get current session
const { data: { session } } = await supabase.auth.getSession();

// User info from Google/Facebook
console.log(session?.user);
// Includes: email, user_metadata (name, avatar_url, etc.)
```

---

## 🔒 Part 4: Security Best Practices

### 1. Environment Variables

Never commit OAuth secrets to Git. Store in `.env`:

```env
# These are PUBLIC (safe to expose)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# OAuth secrets are stored in Supabase Dashboard (server-side)
# NOT in your frontend code
```

### 2. Redirect URL Validation

In Supabase Dashboard → **Authentication** → **URL Configuration**:
- Set **Site URL**: `https://yourdomain.com`
- Add **Redirect URLs**: Only trusted domains
- Example: `https://yourdomain.com/**, http://localhost:5173/**`

### 3. Row Level Security

Ensure RLS is enabled on all tables (already done in our migrations):
```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
```

---

## 🐛 Common Issues & Troubleshooting

### Issue 1: "Redirect URI Mismatch" (Google)

**Error**: `redirect_uri_mismatch`

**Solution**:
1. Check that redirect URI in Google Console exactly matches Supabase callback URL
2. No trailing slashes
3. Use `https://` (not `http://`) for Supabase URL

### Issue 2: "App Not Set Up" (Facebook)

**Error**: "Can't Load URL: The domain of this URL isn't included in the app's domains"

**Solution**:
1. Facebook Login → Settings → Valid OAuth Redirect URIs
2. Add Supabase callback URL
3. Save changes and wait 5 minutes for propagation

### Issue 3: OAuth Popup Blocked

**Solution**:
- Ensure user clicked the button (not auto-triggered)
- Check browser popup settings
- Use `signInWithOAuth` with `options: { skipBrowserRedirect: false }`

### Issue 4: Session Not Persisting

**Solution**:
```typescript
// Configure session persistence
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/dashboard`
  }
});
```

### Issue 5: Missing User Metadata

Some providers don't return all data by default. Request specific scopes:

**Google** - Already includes email, name, picture
**Facebook** - Request additional permissions:

In Supabase → Auth → Providers → Facebook → **Scopes**:
```
email,public_profile
```

---

## 📊 Part 5: Monitoring & Analytics

### View OAuth Users in Supabase

1. Dashboard → **Authentication** → **Users**
2. Filter by provider: Click column headers
3. Check `app_metadata.provider` field:
   - `google` for Google users
   - `facebook` for Facebook users

### Track OAuth Signups

Query users by provider:
```sql
SELECT 
  id, 
  email, 
  raw_user_meta_data->>'full_name' as name,
  raw_app_meta_data->>'provider' as provider,
  created_at
FROM auth.users
WHERE raw_app_meta_data->>'provider' = 'google';
```

---

## 🚀 Part 6: Production Checklist

Before going live:

### Google OAuth
- [ ] OAuth Consent Screen published (not in "Testing" mode)
- [ ] Production domain added to Authorized JavaScript origins
- [ ] Production redirect URI added
- [ ] Terms of Service and Privacy Policy links added

### Facebook OAuth
- [ ] App switched to "Live" mode (not "Development")
- [ ] Privacy Policy URL added to App Settings
- [ ] Production domain added to Valid OAuth Redirect URIs
- [ ] App Review completed (if required)

### Supabase
- [ ] Production redirect URLs configured
- [ ] Email templates customized (Auth → Email Templates)
- [ ] Rate limiting configured (if needed)

---

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Guide](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)

---

## 💡 Quick Reference

### Callback URL Format
```
https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
```

### Frontend Implementation (Already Done)
```typescript
// In AuthPage.tsx
const handleSocialLogin = async (provider: 'google' | 'facebook') => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: provider,
  });
  if (error) console.error(error);
};
```

### Get Current User
```typescript
const { data: { user } } = await supabase.auth.getUser();
console.log(user?.email);
console.log(user?.user_metadata?.full_name);
```

---

**Setup Complete!** 🎉 Your users can now sign in with Google and Facebook.
