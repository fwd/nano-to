![line](https://raw.githubusercontent.com/nano-to/nano-node-cli/main/.github/line.png)

<h1 align="center">Nano Name Service</h1>
<h3 align="center">Hosted on Github</h3>

![line](https://raw.githubusercontent.com/nano-to/nano-node-cli/main/.github/line.png)

<p align="center">
  <img src="https://pbs.twimg.com/media/FwQoJPyXsAA2c24?format=jpg&name=medium" alt="Nano.to" />
</p>

<h1 align="center">🇺🇸 · 🇨🇦 · 🇲🇽 · 🇨🇺 · 🇸🇻 · 🇳🇮 · 🇨🇴 · 🇵🇪 · 🇳🇱 · 🇩🇪 · 🇯🇵 · 🇰🇷 · 🇧🇷 · 🇺🇦 · 🇵🇱 · 🇳🇬 ·  🇮🇳 · 🇪🇸 · 🇮🇩 · 🇫🇷 · 🇲🇲 · 🇦🇺 · 🇵🇭 · 🇸🇪 · 🇵🇹 · 🇹🇷</h1>

![line](https://raw.githubusercontent.com/nano-to/nano-node-cli/main/.github/line.png)

## Documentation

https://docs.nano.to/checkout

![line](https://raw.githubusercontent.com/nano-to/nano-node-cli/main/.github/line.png)

## More Domains

- nano.to (**Original**)
- xno.to (**Redirect**)
- ӿ.to (**Redirect**)

![line](https://raw.githubusercontent.com/nano-to/nano-node-cli/main/.github/line.png)

## Developer API

```
GET: https://nano.to/.well-known/nano-currency.json?names=Moon
```

**Lookup:**

```
{
  names: [
      {
        "status": "active",
        "github": "nano2dev",
        "name": "Moon",
        "address": "nano_1m747htgqw5f...hmz1zaqoj1puj7h96oj",
        "created": "September 13, 2021",
        "expires": "October 7, 2024",
        "created_unix": 1631584140,
        "expires_unix": 1728273600
      }
  ]
}
```

**Reverse Lookup:**

```
GET: https://nano.to/.well-known/nano-currency.json?names=nano_1ak3bsi..
```

**Update Name:**

```
curl -d '{
  "action": "update_name",
  "name": "NanoBull",
  "title": "Software Developer",
  "rep_address": "nano_3t6k35gi95xu6tergt6p...xtoncuohr3"
}' \
-H "Content-Type: application/json" \
"https://rpc.nano.to"
```

![line](https://raw.githubusercontent.com/nano-to/nano-node-cli/main/.github/line.png)

## Host Your Own

Serve the included ```index.html``` file with any web server.

```bash
git clone git@github.com:fwd/nano.git && cd nano
```
```bash
php -S localhost:8080
```

![line](https://raw.githubusercontent.com/nano-to/nano-node-cli/main/.github/line.png)

## Download Dataset

[Nano Known](https://raw.githubusercontent.com/fwd/nano-to/master/known.json) **(~60KB)** is your guide to the galaxy. 

- Realtime: https://api.nano.to/known.json
- Every 24HR: https://nano.to/known.json
- 2024 Snapshot (**Immutable**): [https://nano.to/2024/known.json](https://nano.to/2024/known.json)
- 2023 Snapshot (**Immutable**): [https://nano.to/2023/known.json](https://nano.to/2023/known.json)

![line](https://raw.githubusercontent.com/nano-to/nano-node-cli/main/.github/line.png)

## Bugs & Features ⭐️

Give a star if this project helped you. Contributions, issues and features are welcome at [issues page](https://github.com/fwd/nano/issues).

![line](https://raw.githubusercontent.com/nano-to/nano-node-cli/main/.github/line.png)

## Sponsor (DigitalOcean)

<a align="center" target="_blank" href="https://m.do.co/c/f139acf4ddcb"><img style="object-fit: contain;
    max-width: 100%;" src="https://github.com/fwd/fwd/raw/master/ads/digitalocean_new.png" width="970" /></a>

![line](https://raw.githubusercontent.com/nano-to/nano-node-cli/main/.github/line.png)

## Nano.to Support

- Email: support@nano.to
- Twitter: [@nano_known](https://twitter.com/nano_known)
- Twitter: [@nano2dev](https://twitter.com/nano2dev)
- Discord: [Nano.to Discord](https://discord.gg/HgqDCkzP) 

![line](https://raw.githubusercontent.com/nano-to/nano-node-cli/main/.github/line.png)

## License

**Limited Commercial**

- ✅ Personal & Open Source
- ✅ Commercial use where Nano.to Usernames / Checkout is a means.
- ❌ Commercial use where Nano.to Usernames / Checkout is re-sold.

Contact [support@nano.to](mailto:support@nano.to) for questions.
    
## Stargazers

[![Stargazers over time](https://starchart.cc/fwd/nano-to.svg)](https://github.com/fwd/nano-to)