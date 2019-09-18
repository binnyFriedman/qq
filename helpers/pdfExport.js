const request = require("request");

const API2PDF_BASE_ENDPOINT = "https://v2018.api2pdf.com";
const API2PDF_CHROME_HTML = API2PDF_BASE_ENDPOINT + "/chrome/html";

headlessChromeFromHtml = (html, filename) => {
  var payload = {
    html: html,
    inlinePdf: false,
    fileName: filename,
    options: {
      preferCSSPageSize: true,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      printBackground: true,
    },
  };

  return makeRequest(API2PDF_CHROME_HTML, payload);
};

makeRequest = (endpoint, payload) => {
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: endpoint,
        body: JSON.stringify(payload),
        headers: { Authorization: process.env.API2PDF },
      },
      (e, r, body) => {
        var result = JSON.parse(body);
        if (r.statusCode == 200 && result.success == true) {
          return resolve(result);
        } else {
          return reject(result);
        }
      },
    );
  });
};

module.exports = {
  pdfExport: fileName => {
    return headlessChromeFromHtml(
      '<html style"margin: 0; padding: 0;width: 100%;"><head><meta charset="UTF-8"> <link rel="stylesheet" href="https://firebasestorage.googleapis.com/v0/b/quotes-1566472403403.appspot.com/o/css%2Fstyle.css?alt=media&token=3d37f165-76b0-4cd2-9474-549ff762ec27"/> </head> <body> <div class="Main-background-image"> <div class="inner-section"> <h2 class="date">16/9/2019</h2> <h2 class="quote-reciever-name"> לכבוד: mumiii </h2> <div class="App-logo" style="height:200px"><div> </div></div><h3 class="qoute-greetings">מצורפת הצעת מחיר, נשמח לעמוד לרשותכם ולספק מענה לכל שאלה. נקודה.</h3> <div class="quote-sender"><h5>בברכה,</h5><h5>ביני פרידמן</h5><h5>binny@nekuda.co.il</h5> </div></div></div><div class="quoteBody"><div> <div class="single-service"><h2 class="single-service-header">header test</h2> <ul class="single-service-body"><li>line 1</li><li>line 2</li></ul></div></div><div> <div class="single-service"> <h2 class="single-service-header">גוגmop,oל ואימו</h2> <ul class="single-service-body"><li>3f3f33e 1everver</li><li>liop,ne 2ebebef3f3f</li></ul> </div></div><div> <div class="single-service"><h2 class="single-service-header">header t</h2> <ul class="single-service-body"><li>line 1</li><li>line 2</li></ul></div></div><div><div class="single-service"><h2 class="single-service-header">גוגmop,oל ואימו</h2> <ul class="single-service-body"><li>3f3f33e 1everver</li><li>liop,ne 2ebebef3f3f</li><li>ggggggg</li></ul></div></div><div><div class="priceBlock"><h2 class="single-service-header">תמחור והערות</h2> <ul class="single-service-body"><li></li><li>noteas</li><li></li><li>noteas</li></ul></div><table class="priceTable"><tbody><tr class="firstRow"><th>שירות</th><th>עלות</th><th>מחזור</th></tr><tr class="priceTable"><td></td><td>1500 ₪ </td><td>חודשי</td></tr><tr class="priceTable"><td>headline</td><td>1500 ₪ </td><td>חודשי</td></tr><tr class="priceTable"><td>קוניצ&#x27;וואה</td><td>1500 ₪ </td><td>חודשי</td></tr><tr class="priceTable"><td>headline</td><td>1500 ₪ </td><td>חודשי</td></tr></tbody></table></div></div></body> </html>',
      "nekuda.pdf",
    )
      .then(function(result) {
        console.log(result);

        return result;
      })
      .catch(error => {
        console.log(error);
      });
  },
};
