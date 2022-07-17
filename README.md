## @apikee/authenticator-mongostore

**MongoDB Store for @apikee/authenticator**

It uses [mongoose](https://github.com/Automattic/mongoose) under the hood

## Installation

```tsx
npm i @apikee/authenticator-mongostore
```

## Usage

```tsx
import { Authenticator } from '@apikee/authenticator';
import { MongoStore, ConnectOptions } from '@apikee/authenticator-mongostore';

const mongooseConnectOptions: ConnectOptions = {};

const { createAccess, validateAccess, refreshAccess, revokeAccess } = new Authenticator({
  accessKey: "verySecretAccessKeyPleaseChangeMeOrUseDotenv", // Never commit your secrets to public repo
  refreshKey: "verySecretRefreshKeyPleaseChangeMeOrUseDotenv", // Never commit your secrets to public repo
  store: new MongoStore("mongodb://localhost:27017/DB_NAME", mongooseConnectOptions, () => {
    console.log("DB Connected")
  })
})
```

