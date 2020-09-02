function get_healthData(date, telno, user_id, pass){
  const login_url = 'https://healthcare.mb.softbank.jp/v3/web_login';
  const summary_url = 'https://healthcare.mb.softbank.jp/v3/web_api_get_home_summary';
  
  var payload = {"telno": telno, "user_id": user_id, "passwd": pass};
  var options = {"method": "post", "payload": payload, "followRedirects": false};
  
  var health = {};

  var response = UrlFetchApp.fetch(login_url, options);
  if(response.getResponseCode() == "200"){
    //console.log(response.getAllHeaders());
    var cookies = response.getAllHeaders()['Set-Cookie'];
    var costr = "";
    for(var c in cookies){
      var co = cookies[c].split(';')[0].split('=');
      costr += co[0] + "=" + co[1] + ";";
    }
    var headers = {"Cookie": costr};
    //console.log(headers);
    
    delete options["payload"];
    options["method"] = "get";
    options["headers"] = headers;
    //console.log(options);
    
    response = UrlFetchApp.fetch(summary_url + "?date=" + date, options);
    if(response.getResponseCode() == "200"){
      //console.log(response.getContentText("UTF-8"));
      health_data = JSON.parse(response.getContentText("UTF-8"));
      health["Weight"] = health_data.root.weight;
      health["Bodyfat"] = health_data.root.bodyfat;
      health["BMI"] = health_data.root.bmi;
      health["BMR"] = health_data.root.bmr;
      health["BodyAge"] = health_data.root.bodyage;
      health["Muscle"] = health_data.root.muscle;
      health["Bone"] = health_data.root.bone;
      health["Visceralfat"] = health_data.root.visceralfat;
      health["TBW"] = health_data.root.tbw;
    }
  }
  return health;
}

function update(){
  var today = new Date();
  var yesterday = new Date(today.setDate(today.getDate() - 1));
  var daystr = Utilities.formatDate(yesterday, 'Asia/Tokyo', 'yyyyMMdd');
  //console.log(daystr); 
  
  for(i in account){
    var health = get_healthData(daystr, account[i]["telno"], account[i]["user_id"], account[i]["pass"]);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(account[i]["sheet_name"]);
    sheet.appendRow([daystr, health["Weight"], health["Bodyfat"], health["BMI"], health["BMR"], health["BodyAge"], health["Muscle"], health["Bone"], health["Visceralfat"], health["TBW"]]);
  }

}