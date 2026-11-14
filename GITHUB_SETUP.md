# How to Upload AtlasX Website to GitHub

This guide explains how to upload the **AtlasX Website** application to GitHub so anyone can clone and run it locally on any device (Windows, Mac, Linux, iPad, Android).

---

## Method 1: Upload via Git Command Line (Recommended)

### Step 1: Open Terminal in the Website Folder
Open PowerShell, Terminal, or Command Prompt inside `atlasx-website`:
```bash
cd atlasx-website
```

### Step 2: Initialize Git & Commit
```bash
git init
git add .
git commit -m "feat: initial commit for AtlasX website"
```

### Step 3: Create a New Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Repository name: `atlasx-website` (or `atlasx-web`).
3. Set visibility: **Public** (or **Private**).
4. Do **NOT** check "Add a README" or ".gitignore" (these are already included).
5. Click **Create repository**.

### Step 4: Link and Push to GitHub
Copy the commands shown on GitHub (replace `<your-username>` with your GitHub username):
```bash
git branch -M main
git remote add origin https://github.com/<your-username>/atlasx-website.git
git push -u origin main
```

Done! Your website is now live on GitHub.

---

## Method 2: Upload via GitHub Web Interface (No Git Required)

1. Create a new repository on [github.com/new](https://github.com/new) named `atlasx-website`.
2. Check the box **Add a README file**, then click **Create repository**.
3. Download the clean archive `AtlasX-Website-GitHub.zip` from your project folder.
4. Unzip `AtlasX-Website-GitHub.zip` to a temporary folder on your computer.
5. In your GitHub repository, click **Add file** → **Upload files**.
6. Drag and drop all the unzipped files and folders into GitHub and click **Commit changes**.

---

## How Anyone Can Run This Website Locally on Any Device

Once uploaded to GitHub, anyone can run it on their device by following these 2 simple steps:

### Windows:
1. Clone or download the repository:
   ```bash
   git clone https://github.com/<your-username>/atlasx-website.git
   cd atlasx-website
   ```
2. Double-click `start.bat` (or run `npm install && npm run dev` in terminal).
3. The browser will open at `http://localhost:5173`.

### macOS / Linux:
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/atlasx-website.git
   cd atlasx-website
   ```
2. Run:
   ```bash
   chmod +x start.sh
   ./start.sh
   ```
   *(Or run `npm install && npm run dev`)*
3. The browser will open at `http://localhost:5173`.

### Running on Mobile & Tablets (iOS / Android):
Because Vite is configured with `host: true`, anyone on the same Wi-Fi network can open the website on their phone or tablet!
When `npm run dev` starts, look at the terminal output:
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.15:5173/
```
Open the `Network` address (e.g. `http://192.168.1.15:5173`) in Safari, Chrome, or Firefox on your mobile device to experience the 3D Mars globe and planetary console with full touch interaction!

---

## 1-Click Free Web Hosting (Optional)

You can also deploy this website to the internet for free so anyone can visit it without installing anything:

* **Vercel:** Import your GitHub repository into [vercel.com](https://vercel.com) — it detects Vite automatically and gives you a free `.vercel.app` URL in 30 seconds.
* **Netlify:** Import your repository into [netlify.com](https://netlify.com) — build command: `npm run build`, publish directory: `dist`.
* **GitHub Pages:**
  1. In `vite.config.ts`, add `base: '/atlasx-website/'`.
  2. Run `npm run build`.
  3. Push `dist` to the `gh-pages` branch or enable GitHub Pages in repo settings.
