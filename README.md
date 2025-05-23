# YTP Poopism Online

**YTP Poopism Online** is a web-based video editor inspired by YTPMV (YouTube Poop Music Video), meme remixing, and poopism effects. It enables users to load YouTube or direct video links, apply multiple meme/poopism (YTP) effects in-browser using [ffmpeg.js](https://github.com/ffmpegwasm/ffmpeg.wasm), preview results, and download the edited video—all on a simple GitHub Pages (`github.io`) site.

> 🎬 **Try it out:**  
> [https://Lulu2012-mesty.github.io/ytp-poopism-online/](https://Lulu2012-mesty.github.io/ytp-poopism-online/)

---

## ✨ Features

- **Paste YouTube or Direct Video Links:** (CORS-limited; demo uses a sample video for YouTube)
- **Multiple Poopisms/Effects:** Reverse, speed up, slow down, stutter/repeat, mirror, pitch-shift, and more.
- **Client-side Processing:** Runs entirely in your browser with ffmpeg.js (no server needed).
- **Preview & Download:** Preview the result and download as MP4.
- **Open Source:** Easily fork, remix, and extend for YTP Tennis, Mashups, Memes, and Kids Remix.

---

## 🚀 Getting Started

### 1. Clone or Fork This Repo

```bash
git clone https://github.com/Lulu2012-mesty/ytp-poopism-online.git
cd ytp-poopism-online
```

### 2. Open in Browser

Just open `index.html` locally, or deploy to GitHub Pages.

### 3. Paste a Video Link

- Use a direct MP4 link or YouTube URL (demo loads a sample video for YouTube links due to browser CORS).
- Select desired poopism effects.
- Click **Apply Poopisms**.
- Preview and download the result!

---

## 🛠️ How It Works

- **Frontend:** Pure HTML, CSS, and JavaScript.
- **Video Processing:** [ffmpeg.js](https://github.com/ffmpegwasm/ffmpeg.wasm) runs FFmpeg in your browser using WebAssembly.
- **Effects:** Each "poopism" is mapped to an FFmpeg video/audio filter chain.
- **No Backend:** 100% client-side, privacy-friendly.

---

## 🎨 Effects List

- **Reverse Video**
- **Speed Up / Slow Down**
- **Pitch Up / Down (Audio)**
- **Stutter/Repeat**
- **Mirror/Flip**
- *(Extend easily with more YTP/Meme filters!)*

---

## 📦 Project Structure

```
ytp-poopism-online/
│
├── index.html      # Main UI
├── style.css       # Styling
├── app.js          # Main logic, ffmpeg.js orchestration
└── README.md       # This file
```

---

## ⚡ Live Demo

[https://Lulu2012-mesty.github.io/ytp-poopism-online/](https://Lulu2012-mesty.github.io/ytp-poopism-online/)

---

## 🧩 Extending

- Add new effects by extending the filter chains in `app.js`.
- Integrate with a backend (e.g., youtube-dl API) for advanced YouTube support (CORS-free).
- Fork for meme competitions, YTP Tennis, or mashup remix battles.

---

## 📝 License

MIT License

---

## 🙌 Credits

- [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)
- [file-examples.com](https://file-examples.com/) (sample video)
- All meme/YTP creators and remixers for inspiration!

---

*Create, remix, and have fun with YTP Poopism Online!*
