// .envから環境変数の読み込み
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const from = process.env.FROM;
const tos = process.env.TOS.split(',');

// 添付ファイルデータのBASE64エンコード
const fs = require('fs');
const attachment = fs.readFileSync('./gif.gif').toString('base64');

// メッセージの構築
const msg = {
    personalizations: [
        {
            to: tos[0],
            substitutions: {
                fullname: '田中　太郎',
                familyname: '田中',
                place: '中野'
            }
        },
        {
            to: tos[1],
            substitutions: {
                fullname: '佐藤　次郎',
                familyname: '佐藤',
                place: '目黒'
            }
        },
        {
            to: tos[2],
            substitutions: {
                fullname: '鈴木　三郎',
                familyname: '鈴木',
                place: '中野'
            }
        }
    ],

    from: {
        email: from, // 送信元アドレス
        name: '送信者名' // 送信者名
    },

    subject: '[sendgrid-nodejs-example] フクロウの名前は%fullname%さん', // 件名
    text: '%familyname%さんは何をしていますか？\n彼は%place%にいます', // textパート
    html: '<strong>%familyname%さんは何をしていますか？</strong><br>彼は%place%にいます。', // htmlパート
    substitutionWrappers: ['%', '%'], // 置換タグの指定

    // カテゴリ
    cagtegories: 'category1',
    // カスタムヘッダ
    headers: {
        'X-Sent-Using': 'SendGrid-API'
    },

    // 添付ファイル
    attachments: [
        {
            content: attachment, // 添付ファイルのBASE64エンコードデータ
            filename: 'owl.gif' // 添付ファイル名
        }
    ]
};

(async () => {
    try {
        // 送信
        const response = await sgMail.send(msg);
        // 結果出力
        const obj = JSON.parse(JSON.stringify(response[0]));
        console.log(obj.statusCode);
        console.log(obj.body);
        console.log(obj.headers);
    } catch (error) {
        console.error(error);
    }
})();