# Javascript Payment API

This endpoint provides a JSON response with everything you need to accept Nano directly on your website. Payments go to your address, we don't hold your funds. Verify the payment with an included link in the response.

**⭐ Free API. Works with any valid Nano address and Usernames.**

```
https://nano.to/:ADDRESS?pay=500
```

```js
{
    "id": "f408434dd57",
    "symbol": "nano",
    "rate_usd": "3.060000",
    "address": "YOUR_ADDRESS",
    "amount": "163.399250",
    "value": "500.00",
    "qrcode": "data:image/png;base64,",
    "href": "nano:YOUR_ADDRESS?amount=163399250000000000000000000000000",
    "check": "https://nano.to/YOUR_USERNAME/history/163.399250?checkout=f408434dd57"
}
```

Every request gets a unique payment amount. You can also send a POST request to the same address. 

Demo: https://nano.to/Moon?request=500

## Customize Request

```
https://nano.to/Moon?request=500&memo=cupcake
```

**Params**

|  name |  type |  description
|---|---|---|
|   request | number | (required) Amount in USD. |
|   memo | string |  (Optional) Up to 64 character string. |


## HTML Example

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
axios.get('https://nano.to/Moon?request=500').then((res) => {
    console.log(res.data)
    // build your own custom UI
    // {
    //     "id": "f408434dd57",
    //     "symbol": "nano",
    //     "rate_usd": "3.060000",
    //     "address": "YOUR_ADDRESS",
    //     "amount": "163.399250",
    //     "value": "500.00",
    //     "qrcode": "data:image/png;base64,",
    //     "href": "nano:YOUR_ADDRESS?amount=163399250000000000000000000000000",
    //     "check": "https://nano.to/YOUR_USERNAME/history/163.399250?checkout=f408434dd57"
    // }
})
</script>
```

## Checkout UI Bounty

We'll handle the backend stuff. We want to see what you can do in the front-end with Javascript. Submit a Vue, React (or vanilla) Checkout UI using this API and get 5 Nano for every project worthy! The crazier the better. Good project to learn to code. 

Send Github Repo (or CodePen) to support@nano.to, subject line 'Checkout UI Bounty'.

**If you're reading this, bounty is still up.**