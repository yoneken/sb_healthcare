#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import yaml
import lxml.html
import requests


if __name__ == '__main__':
  f = open("account.yaml", "r+")
  conf = yaml.load(f, Loader=yaml.BaseLoader)
  f.close()

  session = requests.session()

  login_url = 'https://healthcare.mb.softbank.jp/v3/web_login'
  summary_url = 'https://healthcare.mb.softbank.jp/v3/web_api_get_home_summary'
  inputs = {"telno": conf[1]['tel'], "user_id": conf[1]['id'], "passwd": conf[1]['pass'],}

  r = session.post(login_url, data=inputs)
  if r.status_code == requests.codes.ok:
    r = session.get(summary_url + "?date=20200901")
    if r.status_code == requests.codes.ok:
      #print(r.text)
      data = yaml.load(r.text, Loader=yaml.BaseLoader)
      print("体重: " + data["root"]["weight"])
      print("体脂肪率: " + data["root"]["bodyfat"])
      print("BMI: " + data["root"]["bmi"])
      print("基礎代謝: " + data["root"]["bmr"])
      print("身体年齢: " + data["root"]["bodyage"])
      print("骨格筋レベル: " + data["root"]["muscle"])
      print("骨レベル: " + data["root"]["bone"])
      print("内臓脂肪レベル: " + data["root"]["visceralfat"])
      print("水分量: " + data["root"]["tbw"])
