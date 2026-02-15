# 🎉 Birthday Surprise Website

**Created by IKER**

A complete, secure birthday surprise web application where friends can secretly contribute wishes and videos!

## 📁 Project Structure

```
birthday-surprise-website/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css      # All styling
│   └── js/
│       └── app.js          # Application logic
├── docs/
│   └── DEPLOYMENT.md       # Detailed deployment guide
└── README.md               # This file
```

## ✨ Features

✅ **Secure HTTPS** - Content Security Policy enabled
✅ **Birthday Video Upload** - Up to 50MB (admin only)
✅ **WhatsApp Integration** - One-click sharing
✅ **Multiple Reveal Links** - Generate unlimited unique links
✅ **Contributors Showcase** - Shows who sent wishes after video
✅ **Admin Panel** - Password: `king`
✅ **Mobile Responsive** - Works on all devices
✅ **"Created by IKER"** - Red branding at footer

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended - FREE HTTPS)

1. **Create GitHub account**: https://github.com/signup

2. **Create new repository**:
   - Name: `birthday-surprise`
   - Public repository
   - Click "Create repository"

3. **Upload files**:
   ```bash
   # Clone or download this folder
   # Upload entire birthday-surprise-website folder
   # Or use GitHub's web interface to upload files
   ```

4. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from main branch
   - Click Save

5. **Your HTTPS URL**:
   ```
   https://yourusername.github.io/birthday-surprise/
   ```

### Option 2: Netlify (FREE HTTPS)

1. Go to https://app.netlify.com/drop
2. Drag and drop the entire `birthday-surprise-website` folder
3. Get instant HTTPS URL: `https://random-name.netlify.app`

### Option 3: Vercel (FREE HTTPS)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Deploy with one click
4. Get HTTPS URL: `https://birthday-surprise.vercel.app`

## 🔐 HTTPS & Security

This website is configured for secure HTTPS deployment:

- ✅ Content Security Policy header
- ✅ Upgrade insecure requests
- ✅ No mixed content warnings
- ✅ Works with all major hosting providers

**Important**: Always use HTTPS hosting to ensure:
- Secure data transmission
- No browser warnings
- Better SEO ranking
- Avoid telecom spam filters

## 📖 How to Use

### For Organizers:

1. **Create Surprise**:
   - Visit your deployed URL
   - Enter birthday person's name
   - Enter your name (organizer)
   - Click "Create Surprise Page"

2. **Get Your Links**:
   - 📤 **Contribution Link** - Share with friends
   - 🎁 **Reveal Link** - Send to birthday person
   - 👤 **Admin Link** - For managing the surprise

3. **Upload Birthday Video**:
   - Use admin link (or click Admin Login button)
   - Password: `king`
   - Upload video (max 50MB)
   - Click "Save Video"

4. **Share Links**:
   - Click WhatsApp buttons for instant sharing
   - Or copy links manually

### For Friends (Contributors):

1. Click contribution link shared by organizer
2. Enter your name
3. Write your birthday message
4. Submit!

### For Birthday Person:

1. Click the reveal link
2. Answer "Is your birthday today?"
3. If YES:
   - 🎬 Watch birthday video (fullscreen)
   - 💝 See who sent wishes (animated showcase)
   - 📖 Read all messages

## 🔑 Admin Access

**Two Ways to Access Admin Panel:**

### Method 1: Direct Admin Link
```
https://yoursite.com/?id=surprise_123&admin=king
```
- No password prompt
- Instant access

### Method 2: Admin Login Button
- Click "🔐 Admin Login" (top right)
- Enter password: `king`
- Redirects to admin panel

## 🌐 Browser Compatibility

Tested and works on:
- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS/Android)

## 📱 Mobile Support

Fully responsive design:
- Touch-friendly buttons
- Optimized video player
- WhatsApp sharing works perfectly
- Swipe gestures supported

## 💾 Data Storage

- Uses browser LocalStorage
- Data persists between visits
- Each browser stores independently
- No external database required

**Note**: Contributors must use the contribution link. Data is stored locally in each browser.

## 🎨 Customization

To customize colors, fonts, or text:

1. **Colors**: Edit `assets/css/styles.css`
   ```css
   :root {
       --pink: #FF69B4;
       --purple: #9370DB;
       --red: #FF3B3B;  /* IKER branding color */
   }
   ```

2. **Fonts**: Change Google Fonts link in `index.html`

3. **Text**: Edit content in `index.html`

## 🔧 Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: localStorage API
- **Video**: HTML5 Video with FileReader API
- **Animations**: CSS animations
- **Icons**: Emoji (no external dependencies)
- **Fonts**: Google Fonts (Pacifico, Poppins)

## 📊 File Sizes

- `index.html`: ~15 KB
- `assets/css/styles.css`: ~12 KB
- `assets/js/app.js`: ~18 KB
- **Total**: ~45 KB (excluding videos)

## ⚠️ Limitations

- Video uploads: Max 50MB per file
- Storage: Limited by browser (typically 5-10MB total)
- Videos stored as base64 (larger than original file)
- No server-side processing

## 🐛 Troubleshooting

### Videos not playing?
- Use MP4 format
- Keep under 50MB
- Try Chrome browser

### Links not working?
- Ensure full URL with parameters
- Check website is deployed
- Verify surprise ID is correct

### Data not showing?
- Data is stored per-browser
- Use admin panel to see all contributions
- Clear cache if issues persist

### WhatsApp not opening?
- Make sure on mobile device
- Check WhatsApp is installed
- Try copying link manually

## 📝 License

Created by IKER - Free to use and modify

## 🎁 Support

For issues or questions, refer to:
- `docs/DEPLOYMENT.md` for detailed deployment instructions
- Browser console for error messages
- Check browser compatibility

---

## 🚀 Next Steps

1. **Deploy to GitHub Pages** (recommended)
2. **Test all features**:
   - Create a surprise
   - Add a contribution
   - Upload a video
   - Test reveal link
3. **Share with friends!**

**Enjoy creating amazing birthday surprises! 🎂✨**

---

**Created with joy by IKER**
