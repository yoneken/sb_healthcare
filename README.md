# sb_healthcare
Auto-correction of your health data from SB healthcare to Google spreadsheet

ソフトバンクのスマート体組成計で得られる身体の状態をGoogle Spreadsheetに出力します。
SoftBank HealthCareサービスは終了してしまったので、[スマート体組成計の測定データだけを閲覧できるサイト](https://healthcare.mb.softbank.jp/pc/web/assets/setup/web_login_top.php)からスクレイピングします。

## 対応デバイス
- 301SI スマート体組成計
- 702SI スマート体組成計2

## ファイル内容
- README.md
  - 説明書き（このファイル）
- LICENSE
  - ライセンス表記(BSD)
- main.gs
  - メインのスクリプト。これをGoogle Spreadsheet内のスクリプトエディタに張り付けてください。
- account.gs
  - メインのスクリプトから参照されるアカウント情報の格納ファイル。自分のデバイスに合わせて設定してください。こちらもGoogle Spreadsheet内のスクリプトエディタに張り付けてください。
- sb_healthcare.py
  - テスト時に作ったPython実装。測定データを取得します。Google Spreadsheetへの書き込み機能はありません。
- acconut.yaml.sample
  - Python実装から参照されるアカウント情報の格納ファイル。
- .gitignore
  - ソースコード管理用の設定ファイル
  


