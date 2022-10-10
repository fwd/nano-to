# Nano Price API

Price data is updated every 1 minute. [CoinGecko](https://www.coingecko.com/) is used for price data.

## Usage

```text
https://api.nano.to/price
```

**Response:**

```json
{
  "symbol": "XNO",
  "price": 0.91,
  "currency": "USD",
  "timestamp": "July 16, 2022 7:26 PM",
  "timestamp_unix": 1658013977
}
```

## Conversion

```text
https://api.nano.to/price?currency=CAD
```

**Response:**

```json
{
  "symbol": "XNO",
  "price": 1.19,
  "currency": "CAD",
  "timestamp": "July 16, 2022 7:29 PM",
  "timestamp_unix": 1658014167
}
```