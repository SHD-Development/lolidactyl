# Lolidactyl 🥑💕

**The cutest Pterodactyl client area front-end!**

A modern client-area for managing your game servers! Built with love using Next.js 15 ✨

## 🌟 Features

- 🎮 **Server Management** - Create and manage game servers
- 🌍 **Internationalization** - Works in English, Chinese (Simple & Traditional)
- 🔐 **Discord Login** - Login with Discord accounts
- 🎨 **Modern & Simple UI** - Beautiful design with dark/light themes
- ⚡ **Blazing Fast** - Built with Next.js and React
- 📱 **Responsive** - Looks great on your phone and computer
- 📊 **Simple Stats** - See how your servers are doing
- 🌐 **Locations Selection** - Host servers in different locations
- ✨ **Currency** - Create servers with droplets
- 🪄 **Monthly Payment & Renew** - Auto renew included

## 🛠️ Tech Stacks

- **Main Framework**: Next.js 15
- **Frontend**: React 19, TypeScript
- **Styles**: Tailwind CSS
- **Components**: shadcn/ui
- **Authentication**: Auth.js & Discord
- **Multi-language**: next-intl
- **Animations**: Framer Motion

## ⚠️ Important Note!

**This project is only front-end!**

The backend API is **not open source** and you'll need to create your own server-side code to make this work.

## 📋 Installation

Before you start, make sure you have:

- Node.js 18.17 or newer
- A package manager (npm, yarn, pnpm, or bun)
- A Pterodactyl panel
- Discord app for login
- Back-end APIs

### 📥 1. Clone the repository

```bash
git clone https://github.com/SHD-Development/lolidactyl.git
cd lolidactyl
```

### ✨ 2. Install dependencies

Using npm:

```bash
npm install
```

### 🔐 3. Set up environment variables

Rename `.env.example` to `.env`

### 🎉 4. Start the development server

Run this command:

```bash
npm run dev
```

### 🌍 Deployment

When you're ready to share:

```bash
npm run build
npm start
```

## 🔧 Configurations

### Discord Login Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Make a new app
3. Go to "OAuth2" settings
4. Add this redirect URL: `http://yourdomain.com/api/auth/callback/discord`
5. Copy your Client ID and Secret to the `.env.local` file

### Connect to Pterodactyl

1. Open your Pterodactyl admin panel
2. Go to "Application API"
3. Make a new API key
4. Add the key and URL to your `.env` file

## 📁 File Structure

```
src/
├── app/                    # Main app pages
│   ├── api/               # API routes
│   ├── auth/              # Login pages
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Styles
├── components/            # Reusable parts
│   ├── ui/               # UI components
│   └── auth/             # Login components
├── dictionaries/         # Language files
├── hooks/                # React hooks
├── i18n/                 # Language setup
└── lib/                  # Helper functions
```

## 🎯 Commands

- `npm run dev` - Start development (Turbopack)
- `npm run build` - Build for production
- `npm start` - Start production server

## 📜 License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Open an issue on GitHub
- Join our [Discord community](https://dc.shdtw.cloud)

---

Made with 💕 by owen0924, the avocados lover.
