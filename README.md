# sendgridjp-nodejs-example

本コードは[SendGrid公式node.jsライブラリ](https://github.com/sendgrid/sendgrid-nodejs)の利用サンプルです。

## 使い方

```bash
git clone git@github.com:SendGridJP/sendgridjp-nodejs-example.git
cd sendgridjp-nodejs-example
cp .env.example .env
# .envファイルを編集してください
npm install
node sendgrid-nodejs-example.js
```

## .envファイルの編集
.envファイルは以下のような内容になっています。

```bash
API_KEY=api_key
TOS=you@youremail.com,friend1@friendemail.com,friend2@friendemail.com
FROM=you@youremail.com
```
API_KEY:SendGridの[API Key](https://sendgrid.kke.co.jp/docs/User_Manual_JP/Settings/api_keys.html)を指定してください。  
TOS:宛先をカンマ区切りで指定してください。  
FROM:送信元アドレスを指定してください。  
