var dotenv = require('dotenv');
dotenv.load();

var sendgrid_username   = process.env.SENDGRID_USERNAME;
var sendgrid_password   = process.env.SENDGRID_PASSWORD;
var from                = process.env.FROM;
var tos                 = process.env.TOS.split(',');

var sendgrid   = require('sendgrid')(sendgrid_username, sendgrid_password);
var email      = new sendgrid.Email();

tos.forEach(function(to) {
  email.addTo(to);
});
email.setFrom(from);
email.fromname = "送信者名";
email.setSubject('[sendgrid-nodejs-example] フクロウのお名前はfullnameさん');
email.setText('familyname さんは何をしていますか？\r\n 彼はplaceにいます。');
email.setHtml('<strong> familyname さんは何をしていますか？</strong><br />彼はplaceにいます。');
email.addSubstitution('fullname', ['田中 太郎', '佐藤 次郎', '鈴木 三郎']);
email.addSubstitution('familyname', ['田中', '佐藤', '鈴木']);
email.addSubstitution('place', ['office', 'home', 'office']);
email.addSection({'office': '中野'});
email.addSection({'home': '目黒'});
email.addCategory('カテゴリ1');
email.addHeader('X-Sent-Using', 'SendGrid-API');
email.addFile({path: './gif.gif', filename: 'owl.gif'});

sendgrid.send(email, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
});
