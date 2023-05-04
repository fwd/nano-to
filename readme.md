![line](https://github.com/fwd/n2/raw/master/.github/line.png)

<h1 align="center">Nano Name Service</h1>
<h3 align="center">Hosted on Github</h3>

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

<p align="center">
  <img src="https://github.com/fwd/nano/raw/master/dist/images/funding.png" alt="Nano.to" />
</p>

<h1 align="center">🇺🇸 · 🇲🇽 · 🇨🇺 · 🇸🇻 · 🇳🇮 · 🇨🇴 · 🇵🇪 · 🇩🇪 · 🇯🇵 · 🇰🇷 · 🇧🇷 · 🇺🇦 · 🇵🇱</h1>

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Quick Links

- [**Public Nano RPC**](https://rpc.nano.to) - Talk to a Live Nano Node
- [**Javascript -  @nano/wallet.js**](https://github.com/fwd/nano-offline) - Javascript Nano Wallet
- [**Javascript -  paywall.js**](https://github.com/fwd/nano-wall) - Non-custodial Nano Paywall
- [**Javascript - goal.js**](https://github.com/fwd/nano-goal) - Visualize Nano Funding
- [**Web App - Nano.to Usernames**](https://github.com/fwd/nano-to) 
- [**Web App - Nano.to Checkout**](https://docs.nano.to/checkout#getting-started) 
- [**Ubuntu - Nano Docker**](https://github.com/fwd/nano-docker) - 1-Click Nano Node w/ Docker

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Alias Domains

- nano.to (**Official**)
- xno.to (**Redirect**)
- ӿ.to (**Redirect**)

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Verification ✅

**Verified names don't expire.** **[Fork](https://github.com/fwd/nano-to/fork)** this repo and update ```known.json```. Submit a Github PR to ```master``` branch. Changes require proof of ownership. *Ex. Send 0.XXX to yourself.*

**Accepted Values**:
```js
{
  "action": "update_name",
  "name": "NanoBull",
  "title": "Software Developer",
  "full_name": "Leroy Jenkins",
  "twitter": "NanoBull",
  "github": "NanoBull",
  "nostr": "NanoBull",
  "mastodon": "nanobull.mastodon.org",
  "location": "Place Name or Lat, Lon",
  "freelance": "80 NANO / hr",
  "website": "https://fwd.dev",
  "name_for_sale": 500,
  "address": "NEW_NANO_ADDRESS",
  "donation_address": "OPTIONAL_NANO_ADDRESS",
  "planet": "Earth",
  "metadata": {
    "something-custom": true
  }
}
```

![line](https://github.com/fwd/n2/raw/master/.github/line.png)


## Developer API

```
GET: https://nano.to?nostr=esteban,atxmj
```

```
[
    {
      "status": "active",
      "github": "nano2dev",
      "name": "esteban",
      "address": "nano_1m747htgqw5f...hmz1zaqoj1puj7h96oj",
      "created": "September 13, 2021",
      "expires": "October 7, 2024",
      "created_unix": 1631584140,
      "expires_unix": 1728273600
    },
    {
      "name": "atxmj",
      "address": "nano_1dctqbmqxf....91aurmuho48jx3c",
      "created": "November 29, 2021",
      "expires": "November 29, 2023",
      "created_unix": 1638200760,
      "expires_unix": 1701234000
    }
]
```

```
GET: https://nano.to?search=nano_1bank1q3q7x8rim...r51qsdkm8g45
```

```
[
  {
    "name": "bank",
    "status": "active",
    "address": "nano_1bank1q3q7x8rim...r51qsdkm8g45",
    "created": "October 10, 2022",
    "expires": "October 14, 2023",
    "created_unix": 1665418910,
    "expires_unix": 1697332800
  }
]
```

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Host Your Own Nano.to

Serve the included ```index.html``` file with any web server.

```bash
git clone git@github.com:fwd/nano.git && cd nano
```
```bash
php -S localhost:8080
```

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Download Username Dataset

[Nano Address Book](https://raw.githubusercontent.com/fwd/nano-to/master/known.json) **(~60KB)** or use a CDN. 

- User changes reflect instantly: https://api.nano.to/known.json
- Updated every 24 hours: https://nano.to/known.json
- Yearly snapshot (immutable): https://nano.to/2023/known.json

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Bugs & Features ⭐️

Give a star if this project helped you. Contributions, issues and features are welcome at [issues page](https://github.com/fwd/nano/issues).

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Sponsor (SimpleSwap)

<a align="center" target="_blank" href="https://simpleswap.io/?ref=ecc1985b556a"><img style="object-fit: contain;
    max-width: 100%;" src="https://github.com/fwd/fwd/raw/master/ads/simpleswap.png" width="970" /></a>

## Nano.to Support

- Email: support@nano.to
- Twitter: [@nano2dev](https://twitter.com/nano2dev)
- @nano2dev on [Nano’s Discord](https://discord.com/invite/RNAE2R9) 

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Usage License

**Limited Commercial**

- ✅ Personal & Open Source
- ✅ Commercial use where Nano.to Usernames / Checkout is a means.
- ❌ Commercial use where Nano.to Usernames / Checkout is re-sold.

Contact [support@nano.to](mailto:support@nano.to) for questions.

    
## Stargazers

[![Stargazers over time](https://starchart.cc/fwd/nano-to.svg)](https://github.com/fwd/nano-to)
