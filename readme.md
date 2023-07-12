![line](https://github.com/fwd/n2/raw/master/.github/line.png)

<h1 align="center">Nano Name Service</h1>
<h3 align="center">Hosted on Github</h3>

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

<p align="center">
  <img src="https://pbs.twimg.com/media/FwQoJPyXsAA2c24?format=jpg&name=medium" alt="Nano.to" />
</p>

<h1 align="center">🇺🇸 · 🇨🇦 · 🇲🇽 · 🇨🇺 · 🇸🇻 · 🇳🇮 · 🇨🇴 · 🇵🇪 · 🇳🇱 · 🇩🇪 · 🇯🇵 · 🇰🇷 · 🇧🇷 · 🇺🇦 · 🇵🇱 · 🇳🇬 ·  🇮🇳 · 🇪🇸 · 🇮🇩 · 🇫🇷 · 🇲🇲 · 🇦🇺 · 🇵🇭 · 🇸🇪 · 🇵🇹 · 🇹🇷</h1>

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Quick Links

- [**Public Nano RPC**](https://rpc.nano.to)
- [**Javascript -  @nano/wallet.js**](https://github.com/fwd/nano-offline)
- [**Javascript -  paywall.js**](https://github.com/fwd/nano-wall)
- [**Javascript - goal.js**](https://github.com/fwd/nano-goal) 
- [**Web App - Nano.to Usernames**](https://docs.nano.to/usernames)
- [**Web App - Nano.to Checkout**](https://docs.nano.to/checkout#getting-started) 
- [**Web App - Nault.Pro w/ ChatGPT**](https://nault.pro)
- [**Ubuntu - Nano 1-Click Docker**](https://github.com/fwd/nano-docker) 

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Shorter Domains

- nano.to (**Official**)
- xno.to (**Redirect**)
- ӿ.to (**Redirect**)

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

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

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Host Your Own

Serve the included ```index.html``` file with any web server.

```bash
git clone git@github.com:fwd/nano.git && cd nano
```
```bash
php -S localhost:8080
```

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Download Dataset

[Nano Known](https://raw.githubusercontent.com/fwd/nano-to/master/known.json) **(~60KB)** is your guide to the galaxy. 

- Realtime: https://api.nano.to/known.json
- Every 24HR: https://nano.to/known.json
- 2023 Snapshot (**Immutable**): [https://nano.to/2023/known.json](https://nano.to/2023/known.json)

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Verification

Fork Nano.to and update *known.json*. Verified names don't expire.

**Optional Values:**

```
{
  "name": "NanoBull",
  "title": "Software Developer",
  "twitter": "NanoBull",
  "github": "NanoBull",
  "calendly": "NanoNullConsulting/30min",
  "calendly_price": 1,
  "location": "Place Name or Lat, Lon",
  "freelance": "80 NANO / hr",
  "website": "https://fwd.dev",
  "name_for_sale": 500,
  "goal_ui": "100:Server Hosting"
  "address": "NEW_NANO_ADDRESS",
  "donation_address": "OPTIONAL_NANO_ADDRESS",
  "planet": "Earth"
}
```

## Bugs & Features ⭐️

Give a star if this project helped you. Contributions, issues and features are welcome at [issues page](https://github.com/fwd/nano/issues).

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Sponsor (DigitalOcean)

<a align="center" target="_blank" href="https://m.do.co/c/f139acf4ddcb"><img style="object-fit: contain;
    max-width: 100%;" src="https://github.com/fwd/fwd/raw/master/ads/digitalocean_new.png" width="970" /></a>

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Nano.to Support

- Email: support@nano.to
- Twitter: [@nano2dev](https://twitter.com/nano2dev)
- **Mastodon:** [Xno.Social](https://xno.social/public/local) 
- Discord: [Nano.to Discord](https://discord.gg/HgqDCkzP) 

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## License

**Limited Commercial**

- ✅ Personal & Open Source
- ✅ Commercial use where Nano.to Usernames / Checkout is a means.
- ❌ Commercial use where Nano.to Usernames / Checkout is re-sold.

Contact [support@nano.to](mailto:support@nano.to) for questions.
    
## Stargazers

[![Stargazers over time](https://starchart.cc/fwd/nano-to.svg)](https://github.com/fwd/nano-to)
