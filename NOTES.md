# NOTES

```shell
$ yarn add @material-ui/core @material-ui/icons yarn add react-router-dom react-use-dimensions uuid
$ yarn add @types/react-router-dom --dev
```

 `.env`
BROWSER=none
# REACT_APP_REST_SERVER_URI

## Prevent Zoom PWA

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

## JWT Rsa

- [JSEncrypt: Online RSA Key Generator](https://travistidwell.com/jsencrypt/demo/)

> start above link

```shell
$ mkdir certs && cd certs
# generates a private key
$ openssl genrsa -out rsa_1024_priv.pem 1024
# copy to clipboard
$ cat rsa_1024_priv.pem | ccc
# generates public key from private key
$ openssl rsa -pubout -in rsa_1024_priv.pem -out rsa_1024_pub.pem
# copy to clipboard
$ cat rsa_1024_pub.pem | ccc
```

- [Introduction to JSON Web Tokens](https://jwt.io/introduction/)
- [Using x.509 certs with JWS/JWT/JWK](https://gist.github.com/jasonk000/26f987681b56fe34c235248c980b5c2e)
- [Demo: Using Public/Private keys to make/verify JavaScript Web Tokens (JWT)](https://github.com/BlitzkriegSoftware/NodeJwtRsa)

## React Hook useEffect has a missing dependency: 'init'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

- [How to fix missing dependency warning when using useEffect React Hook?](https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook)

> optional use `// eslint-disable-next-line react-hooks/exhaustive-deps`

here we have a init function in `useEffect` that we want to fire only once, to use it use like that `useEffect(() => { init(); })`, without dependency array

`QRCodeReader.tsx`

```typescript
useEffect(() => {
  init();
  // cleanUp
  return () => { };
  // don't use dependency array `}, []);` here else we have
  // React Hook useEffect has a missing dependency: 'init'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
});
```
