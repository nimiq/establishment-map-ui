<img src="./docs/background.png" alt="Nimiq Crypto Map banner" />

# Crypto Nimiq Map

A map of the crypto world, powered by Nimiq.

## Environment Variables

Duplicate `.env.example` and rename it to `.env`. Then fill in the values.


```bash
VITE_API_URL=             # API Endpoint
VITE_GOOGLE_MAP_KEY=          # Map ID associated with the maps key in Google Cloud
VITE_RECAPTCHA_SITE_KEY=      # Recaptcha Site Key
```

## Project Setup

```sh
npm install

yarn install
```

### Compile and Hot-Reload for Development

```sh
npm run dev

yarn dev
```

## API

The API specification is hosted at [https://github.com/nimiq/establishments-map-backend/blob/main/docs/openapi.yaml](https://github.com/nimiq/establishments-map-backend/blob/main/docs/openapi.yaml). 

Run `yarn api:generate` to generate the API client.
