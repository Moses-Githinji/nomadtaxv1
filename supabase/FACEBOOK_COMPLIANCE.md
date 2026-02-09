# Facebook OAuth Compliance URLs

For Facebook OAuth integration, you'll need to provide these URLs in your Facebook App settings.

## ⚠️ Important: Facebook Requires Public URLs

**Facebook does NOT accept localhost URLs** for Privacy Policy and Data Deletion pages, even during development. These pages must be publicly accessible on the internet.

### Solutions

#### Option 1: Use ngrok (Recommended for Testing) ⭐

ngrok creates a public tunnel to your localhost, making your pages accessible to Facebook.

**Steps:**

1. **Install ngrok:**
   ```bash
   # Download from https://ngrok.com/download
   # Or using npm:
   npm install -g ngrok
   ```

2. **Start your dev server:**
   ```bash
   npm run dev
   ```

3. **In a new terminal, create a tunnel:**
   ```bash
   ngrok http 5173
   ```

4. **Copy the public URL** (looks like `https://abc123.ngrok.io`)

5. **Use in Facebook App Settings:**
   - Privacy Policy: `https://abc123.ngrok.io/privacy`
   - Data Deletion: `https://abc123.ngrok.io/data-deletion`

> **Note:** Free ngrok URLs change each time you restart. Consider using a paid ngrok account for a persistent URL, or deploy to production.

#### Option 2: Deploy to Production

Deploy your app to a hosting service:
- **Vercel** (easiest for Vite/React)
- **Netlify**
- **Railway**
- **Render**

Then use your production URLs in Facebook settings.

#### Option 3: Temporary Workaround (Not Recommended)

You can temporarily use placeholder URLs from existing sites while testing OAuth locally:
- Use generic privacy policy generators
- **Important:** Replace with real URLs before going live!

## Required URLs for Facebook App Review

### Privacy Policy URL
```
https://your-ngrok-url.ngrok.io/privacy (testing with ngrok)
https://yourdomain.com/privacy (production)
```

### Data Deletion Instructions URL
```
https://your-ngrok-url.ngrok.io/data-deletion (testing with ngrok)
https://yourdomain.com/data-deletion (production)
```

## Where to Add These URLs

1. Go to [Facebook Developer Console](https://developers.facebook.com/)
2. Select your NomadTax app
3. Go to **Settings** → **Basic**
4. Add the URLs:
   - **Privacy Policy URL**: Add your privacy policy URL
   - **User Data Deletion**: Add your data deletion URL

## Pages Created

✅ **Privacy Policy** (`/privacy`)
- Comprehensive privacy policy
- Covers data collection, usage, and sharing
- Explains OAuth provider data handling
- Lists user rights (GDPR/PDPA compliant)

✅ **Data Deletion Instructions** (`/data-deletion`)
- Clear deletion process
- Multiple deletion options
- Timeline for deletion
- Request form included
- Explains what gets deleted vs retained

## Quick Setup with ngrok

```bash
# Terminal 1: Run your app
npm run dev

# Terminal 2: Start ngrok
ngrok http 5173

# Copy the https URL (e.g., https://abc123.ngrok.io)
# Add to Facebook:
# - Privacy: https://abc123.ngrok.io/privacy
# - Data Deletion: https://abc123.ngrok.io/data-deletion
```

## Facebook App Review Checklist

Before submitting your app for review:

- [ ] Privacy Policy URL is publicly accessible (test in incognito)
- [ ] Data Deletion URL is publicly accessible (test in incognito)
- [ ] Both URLs added to Facebook App Settings
- [ ] Privacy Policy mentions Facebook Login integration
- [ ] Data Deletion page explains how to revoke Facebook permissions
- [ ] If using ngrok, ensure it's running when Facebook reviews your app

## Testing

Test your public URLs:
1. Open the ngrok URL in an incognito browser
2. Navigate to `/privacy` and `/data-deletion`
3. Ensure both pages load correctly

## Production Deployment

When deploying to production:
1. Deploy your app to a hosting service
2. Update the URLs in Facebook App Settings with your production domain
3. Ensure both pages are accessible at:
   - `https://yourdomain.com/privacy`
   - `https://yourdomain.com/data-deletion`

## Email for Privacy Requests

The pages reference: `privacy@nomadtax.co.ke`

Make sure this email is:
- Actively monitored
- Has auto-reply set up
- Can handle deletion requests within 30 days

## Troubleshooting

**"Invalid domain" error:**
- ❌ Don't use `http://localhost:5173`
- ❌ Don't use `http://127.0.0.1:5173`
- ✅ Use ngrok HTTPS URL: `https://abc123.ngrok.io`
- ✅ Or use production domain: `https://yourdomain.com`

**ngrok URL expired:**
- Free ngrok URLs change on restart
- Restart ngrok and update Facebook settings
- OR upgrade to ngrok paid plan for persistent URLs

