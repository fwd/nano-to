![line](https://github.com/fwd/n2/raw/master/.github/line.png)

<h1 align="center">Nano Name Service</h1>
<h3 align="center">Hosted on Github</h3>

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

<p align="center">
  <img src="https://github.com/fwd/nano/raw/master/dist/images/banner.png" alt="Nano.to" />
</p>

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Quick Links

- [Checkout Pages](#checkout-ui)
- [Nano Price API](#nano-price-api)
- [Nano PoW API](#nano-pow-api)
- [Username Dataset](#username-dataset)

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Checkout Pages

**Any Address:**
```python
https://nano.to/:ADDRESS
```

**Nano.to Usernames:**
```python
https://nano.to/@Nautilus
```

**Customize URL:**
```python
https://nano.to/@Nautilus?amount=50&random=true
```

<img src="https://github.com/fwd/nano/raw/master/dist/images/single-ui.png" alt="Single Panel UI" />

### Checkout w/ Plans

```python
https://nano.to/@Moon?plans=Tip:0.133,Small:1,Medium:10,Large:20
```

<img src="https://github.com/fwd/nano/raw/master/dist/images/double-ui.png" alt="Single Panel UI" />

### More Advanced Example

```python
https://nano.to/@Nautilus
?background=$1abc9c:$9b59b6
&color=$FFF
&highlight=white
&vanity=red
&qrcode=white:red
&logo=https://nano.to/dist/logo/cyber.png
```

<img src="https://github.com/fwd/nano/raw/master/dist/images/custom-ui.png" alt="Single Panel UI" />

**Available Params:**

- **amount** (number) : Single panel with price. No plans.
- **plans** (string) : Plans separated by commas. Ex. Tip:30,Small:5
- **currency** (string) : ISO Currency Symbol. Ex JPY
- **image** (image/url) : Display Image. Image URL.
- **random** (boolean) : Use random amounts. Ex + 0.00XXXX
- **color** (string) : Text color. Ex red:blue
- **background** (string) : Background color. Ex white:gray
- **highlight** (string) : Box backgrounds value. Ex blue:red
- **qrcode** (string) : QR Code colors. Ex white:black
- **logo** (image/url) : Replace QR Code logo. Image URL.
- **cancel** (string) : Redirect URL when pressed 'Cancel'
- **success** (string) : Redirect URL on success.

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Username Dataset

```pthon
https://nano.to/known.json
```

## Nano Price API

```pthon
https://api.nano.to/price
```

## Nano PoW API

```pthon
https://pow.nano.to/:HASH
```

> 5 Free / Minute (\~0.5s Response Time)

## Available Domains

- ӿ.to
- xno.to
- nano.to

## Contributing

Give a ⭐️ if this project helped you!

Contributions, issues and feature requests are welcome at [issues page](https://github.com/fwd/nano-names/issues).

## License

**Limited Commercial Use:**

- ✅ Personal & Open Source
- ✅ Commercial use where Nano.to Usernames or Checkout is **NOT** the end product.
- ❌ Re-selling/Re-Packing: Nano.to Usernames or Checkout **IS** the end product.

Questions about licensing? Email: hello[@]nano.to

Copyright © [nano2dev](https://twitter.com/nano2dev).

## Stargazers

[![Stargazers over time](https://starchart.cc/fwd/nano-names.svg)](https://github.com/fwd/nano-names)
