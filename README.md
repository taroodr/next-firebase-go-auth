## 設定方法
`client/.env` に以下の情報を記載

```
FIREBASE_PUBLIC_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_DATABASE_URL
FIREBASE_PROJECT_ID
```

`api/go-nextjs-auth-firebase-adminsdk.json` に以下の情報を記載

```
{
  "type"
  "project_id"
  "private_key_id"
  "private_key"
  "client_email"
  "client_id"
  "auth_uri"
  "token_uri"
  "auth_provider_x509_cert_url"
  "client_x509_cert_url"
}
```