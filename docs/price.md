# Nano Price API

The price updates every 60 seconds. CoinMarketCap is used for price data.

## Get Request

```text
https://nano.to/price
```

## JSON Response

```json
{
  "symbol": "XNO",
  "price": 0.91,
  "currency": "USD",
  "timestamp": "July 16, 2022 7:26 PM",
  "timestamp_unix": 1658013977
}
```

## Currencies

```js
https://nano.to/price?currency=CAD
```

```json
{
  "symbol": "XNO",
  "price": 1.19,
  "currency": "CAD",
  "timestamp": "July 16, 2022 7:29 PM",
  "timestamp_unix": 1658014167
}
```