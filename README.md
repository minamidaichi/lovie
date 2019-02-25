## ローカルPCでlovieを立ち上げる
lovieディレクトリ直下（README.mdと同じ階層）で下記のコマンドを実行する。
```
docker-compose -f ./devops/docker-compose.yml up
```

※PC起動時にコンテナを立ち上げたままにしておくには下記を実行する。
```
docker update --restart=always LOVIE
```