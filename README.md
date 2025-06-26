# 🪙 Miner Main

A lightweight CPU miner implementation in Node.js and JavaScript, designed to simulate or connect to real mining pools using SHA-1 hashing.
https://duinocoin.com
---

## 📁 Project Structure

```
miner-main/
├── app.js                  # Entry point (optional server app)
├── package.json            # Node.js dependencies
├── public/                 # Frontend (HTML/CSS)
│   ├── index.html          # Web interface
│   └── style.css           # Basic styles
├── miner/
│   ├── config.ini          # Mining config (username, algorithm, etc.)
│   ├── index.js            # Main mining logic (connects to pool)
│   ├── pools.json          # Pool configuration (IP/port)
│   ├── testLib.js          # SHA-1 test lib
│   └── src/
│       └── utils.js        # Helper: SHA1, getPool, hashRate calc
│___ .github/workflows       # mining on github action
```

---

## ⚙️ How to Use

### 1. 📦 Install dependencies

```bash
npm install
```

### 2. 🛠 Configure your mining credentials

Edit `miner/config.ini`:

```ini
[main]
username = yourUsername
mining_key = 123456
threads = 1
hashlib = js-sha1
```

Edit `miner/pools.json`:

```json
[
  {
    "ip": "your.pool.ip",
    "port": 2850,
    "name": "custom-pool"
  }
]
```

---

### 3. 🚀 Start mining

```bash
node miner/index.js
```

---

## 🌐 Web Interface

You can host the frontend by launching `app.js` (optional if implemented):

```bash
node app.js
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 💡 Features

- Pure JavaScript SHA-1 miner (browser- or Node-based)
- TCP connection to pools
- Simple config via `.ini` and `.json`
- Clean modular design for browser & Android migration

---

## 📜 License

MIT © 2024 — Modified & extended by Nam2006

---
