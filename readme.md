![line](https://github.com/fwd/n2/raw/master/.github/line.png)

<h1 align="center">Nano Name Service</h1>
<h3 align="center">Hosted on Github</h3>

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

<p align="center">
  <img src="https://github.com/fwd/nano/raw/master/dist/images/funding.png" alt="Nano.to" />
</p>

<h1 align="center">🇺🇸 · 🇲🇽 · 🇵🇹 · 🇨🇺 · 🇸🇻 · 🇵🇷 · 🇳🇮 · 🇨🇴 · 🇵🇪 · 🇪🇸 · 🇩🇪 · 🇯🇵 · 🇺🇦 · 🇰🇷 · 🇧🇷</h1>

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Quick Links

- [**Live Nano Node**](https://rpc.nano.to)
  - [**Offline.js**](https://github.com/fwd/nano-offline#offlinejs) - Non-custodial JS Nano Wallet.
  - [**Paywall.js**](https://github.com/fwd/nano-wall#nanowalljs) - Non-custodial Nano Paywall
  - [**Goal.js**](https://github.com/fwd/nano-goal#nanogoaljs) - Visualize Nano Funding
- [**Nano.to RPC-2**](https://api.nano.to) 
  - [**Usernames**](https://docs.nano.to/usernames#getting-started) 
  - [**Checkout UI**](https://docs.nano.to/checkout#getting-started) 
- [**NanoDocker**](https://github.com/fwd/nano-docker) - 1 Click Live Nano Node

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Alias Domains

- nano.to (**Official**)
- xno.to (**Redirect**)
- ӿ.to (**Redirect**)

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Username API

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

## Verification

Verify your Nano.to Username by **[Forking](https://github.com/fwd/nano-to/fork)** Nano.to and changing ```known.json```. 

**Verified names don't expire.**

Accepted Changes:
```js
{
  "status": "active",
  "github" "GITHUB_USERNAME", // required for checkmark
  "nostr" "NOSTR_URI",
  "twitter" "TWITER_USERNAME"
  ...
}
```

Submit a Github PR to ```master``` branch.

Changes require proof of ownership.

> Send 0.XXX to yourself

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Github ⭐️

Give a star if this project helped you!

Contributions, issues and feature requests are welcome at [issues page](https://github.com/fwd/nano/issues).

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Nano.to Support

- Email: support@nano.to
- Twitter: [@nano2dev](https://twitter.com/nano2dev)
- @nano2dev on [Nano’s Discord](https://discord.com/invite/RNAE2R9) 

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## License

**Limited Commercial Use**

- ✅ Personal & Open Source
- ✅ Commercial use where Nano.to Usernames / Checkout is a means.
- ❌ Commercial use where Nano.to Usernames / Checkout is re-sold.

Contact [support@nano.to](mailto:support@nano.to) for questions.

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Stargazers

[![Stargazers over time](https://starchart.cc/fwd/nano-to.svg)](https://github.com/fwd/nano-to)
