## microCMS, Next.js, Typescript を用いたマイクロブログシステム

## 使用言語

Next.js13, Typescript

## このシステムの概要

ヘッドレス CMS による blog システム

ヘッドレス CMS は microCMS を使用。
ヘッドレス CMS については `microCMS公式ページ`(https://microcms.io/) を御覧ください。

## 用意するもの

1. 上位フォルダに「.env.local」ファイルを作成。
2. 下記のようにする。

```bash
API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXX
SERVICE_DOMAIN=XXXXXXXXX
```

3. API_KEY と SERVICE_DOMAIN 取得方法は microCMS 公式ページ(https://microcms.io/) を参照。

## 起動方法

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## その他

今回 app フォルダは使用しておりません。
