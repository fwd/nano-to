## iFrame API

Show Nano Balance and other information in a colorful iFrame. Ideal for streaming.

**⭐️ This API only works with active Nano.to Usernames.**

## Usage

Just vist any of these URLs in a browser. Make sure to replace ```YOUR_USERNAME``` with your Username. That's it. To Live Stream it, maybe record the screen or something. Or you have better ideas? We can't wait to see what people build with this API. 

## Base URL

```
https://nano.to/YOUR_USERNAME/iframe
```

### Basic Example

```
https://nano.to/Moon/iframe?color=purple
```

```html
<html>
<body>
    <iframe src='https://nano.to/Moon/iframe?color=purple'></iframe>
</body>
</html>
```

![](../assets/iframe-home.png)

## Change The Page Color

Pass the ``` ?color=purple ``` URL flag to change the hue of the page.

```
https://nano.to/YOUR_USERNAME/iframe?color=green
```

#### Available Colors

- blue (default)
- red
- green
- purple
- pink

More coming soon.

![](../assets/iframe-home-green.png)

## Page With Payments & Donations

```
https://nano.to/Kraken/iframe?body=-donations-
```

![](../assets/iframe-donations.png)


## Page With Your Qr Code

```
https://nano.to/Kraken/iframe?body=-qr-
```

![Test](../assets/iframe-qrcode.png)


## Page With Custom Text (Advanced)

```
https://nano.to/Moon/iframe
?body=<h1>Nano.to/Reps</h2>-qr:150-<h1>Donate__To__NANO__Reps</h2>
&title=false
```

![Test](../assets/iframe-message.png)

#### Available Variables

- __ : Double underscores are treated as spaces.
- -br- : Line break.
- -xno- : Ӿ symbol
- -balance- : The account balance in NANO.
- -pending- : The account pending balance in NANO.
- -value- : The account balance in USD.
- -username- : The account Username, if any.
- -block_count- : The account block count.

- -price- : The current NANO price.

- -qr- : A Qr Code image for the account address.
- -qr:100- : Pass a number between 100 - 500 in px to chage Qr Code size.

- -sender- : The NANO address of the last payment's sender.
- -amount- : The NANO amount of the last payment.
- -value- : The USD value of the last payment.
- -message- : The special message of the last payment. **Coming Soon.** 

## Additional Parameters

#### Automatically Refresh Page

Pass the ``` ?reload= ``` URL flag to accomplish this. The intervals are in seconds. 

```
https://nano.to/YOUR_USERNAME/iframe?reload=5
```


#### Customize Title Bar (or Hide)

Pass the ``` ?title= ``` URL flag to accomplish this. Accepts strings.

```
https://nano.to/YOUR_USERNAME/iframe?title=Donate
```

***Hide***

```
https://nano.to/YOUR_USERNAME/iframe?title=false
```

#### Zoom Page In/Out

Pass the ``` ?zoom=1.1 ``` URL flag to increase or decrease the zoom of the page. Value can set any decimal between 0 - 2

```
https://nano.to/YOUR_USERNAME/iframe?zoom=1.2
```
