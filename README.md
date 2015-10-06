machiasobi-signage
===================

# 使い方

1. `npm install` & `bower install`
2. `gulp` でBrowserSyncを使った開発ができます
3. `gulp build` で ./dest に本番用にminifyしたファイルを出力します

# デプロイ

1. `gulp build`
2. `cd dist`
3. `gsutil -m cp -r ./ gs://YOUR_BUCKET_NAME`

# ACL設定

デプロイには関係ないけど備忘

1. `gsutil defacl ch -u AllUsers:R gs://BUCKET_NAME`
