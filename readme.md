![Logo](public/promo-badge.png)
<br>

**Sapar Mini** is a lightweight, offline-first media server and file manager built with **Electron** and **Node.js**. It allows you to share files, stream media, and manage folders over a local network — no internet required.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/DreamerView/sapar)](https://github.com/DreamerView/sapar/releases)
[![Downloads](https://img.shields.io/github/downloads/DreamerView/sapar/total)](https://github.com/DreamerView/sapar/releases)
![Last Commit](https://img.shields.io/github/last-commit/DreamerView/sapar)
![Contributors](https://img.shields.io/github/contributors/DreamerView/sapar)
![Repo Size](https://img.shields.io/github/repo-size/DreamerView/sapar)
![Platforms](https://img.shields.io/badge/platforms-Windows%20%7C%20macOS%20%7C%20Linux-blue)

![Promo](public/promo.png)

---

## 🚀 Features

- 🖥️ Runs as a desktop Electron app
- 🌐 Share files and stream media over LAN
- 📁 View and manage folders via intuitive UI
- 🔒 Local-only, private and secure
- ⚡ Fast and lightweight
- 🌐 Easy access via local IP or hostname (e.g. `http://sapar.local:3000`) with mDNS/Bonjour

---

## 🛠 Technologies

[![Electron](https://img.shields.io/badge/Electron-2E2AB0?logo=electron&logoColor=47848F&style=for-the-badge)](https://www.electronjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-2E2AB0?logo=express&logoColor=white&style=for-the-badge)](https://expressjs.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-2E2AB0?logo=bootstrap&logoColor=7952B3&style=for-the-badge)](https://getbootstrap.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript_ES6%2B-2E2AB0?logo=javascript&logoColor=F7DF1E&style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 📦 Installation

Download the latest version from the [Releases](https://github.com/DreamerView/sapar/releases/latest).

> ⚠️ No internet access is required after installation.

---

## 📡 How It Works

1. Launch the app
2. Your computer starts a local server (e.g. `http://192.168.1.5` or `http://sapar.local` via mDNS/Bonjour)
3. Connect from any device in the same Wi-Fi network
4. Browse and download files via browser

---

## 📦 Use Cases
- 🎓 Share classroom resources in schools without internet  
- 💼 Stream media in office LAN for presentations  
- 🏠 Quickly share files with family devices at home


---

## 🔄 Comparison with LocalSend

[LocalSend](https://github.com/localsend/localsend) is a great open-source project for cross-platform file sharing.  
Below is a friendly comparison to help users choose the right tool for their needs.

| ✨ Feature               | **Sapar Mini** 🚀                                          | **LocalSend** 📱 |
|--------------------------|------------------------------------------------------------|------------------|
| 📡 Offline-first transfers | ✅ Runs primarily in local/LAN networks                    | ✅ Works over LAN without internet |
| 💻 Cross-platform         | 🖥 Windows / 🍎 macOS / 🐧 Linux (Electron app)             | 🖥 Windows, 🍎 macOS, 🐧 Linux, 📱 Android, 🍏 iOS |
| 🎯 Ease of use            | 🌐 Self-contained HTTP server + web UI                     | 🎨 Polished UI, 🔍 auto device discovery, 📂 drag-and-drop |
| 🔒 Security               | 🛠 (Planned) HTTPS/mDNS, local network settings            | 🔐 TLS encryption with auto-generated certificate each session |
| 🖥 UI integration         | 💼 Built into a desktop application                        | 📱 Mobile OS share menu integration |
| ⚙️ Extra capabilities     | 📡 Bonjour/mDNS, fully offline autonomous server           | 🔗 Web link & 📷 QR code access without client |
| ⚠️ Limitations / constraints | 🌍 Dependent on local network/firewall settings           | 📌 Requires opening port 53317, may have VPN issues |
| 📜 License                | 📄 MIT                                                     | 📄 Apache-2.0 |

---

### 🚀 When Sapar Mini is a better fit
- 🖥 When you need a **dedicated offline-first server** on a desktop/laptop.
- ⚙️ If you require **flexible network setup** (custom ports, Bonjour listing, mDNS).
- 🎯 If you want **simple installation** without mobile app dependencies.

### 📱 Where LocalSend excels
- 🌍 **Wider platform support** (including iOS & Android).
- 🎨 **Intuitive mobile UX** and OS-level share menu integration.
- 🔐 **End-to-end TLS encryption** with automatic certificate generation.
- 🆓 **No ads**, fully open source, and very lightweight.
- 📷 **QR code or direct link** access without installing a client.

---

## 🖥️ When to Use Sapar Mini

- 📡 You want a dedicated desktop media server without internet  
- ⚡ You prefer simple setup without installing mobile apps  
- 🔧 You need flexible network config (port, Bonjour)

---

## 🤝 Contributing

This project is still in its early stage. Contributions, suggestions, and feedback are welcome!

---

## 📃 License

MIT License
