exports.handler = function (event, context) {
    var json;
    var email;
    var organizationName = "{ \"Organization\":";
    var link = "\"link\": \"<a href=\'https://www.santahacks.com/signup.html?orgname=";

    var getParams = {
        Bucket: 'setup.santahacks.com',
        Key: JSON.stringify(event.Records[0].s3.object.key).replace(/['"]+/g, ''),
    };

    console.log(getParams);

    s3.getObject(getParams, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            json = data.Body.toString('utf-8');
            json = JSON.parse(json);
            email = JSON.stringify(json.email);
            email = email.replace(/['"]+/g, '');
            console.log(email);
            link = link + JSON.stringify(json.Organization).replace(/['"]+/g, '').replace(/ /g,"_") + "'" + ">https://www.santahacks.com/signup.html?orgname=" + JSON.stringify(json.Organization).replace(/['"]+/g, '').replace(/ /g,"_") + "</a>\"";
            json = organizationName + JSON.stringify(json.Organization);
            json = json + "," + link + "}";
            console.log(json);
        }

    });
    setTimeout(function () {
        var html = '<!doctype html>\n<html>\n<head>\n<meta name=viewport content="width=device-width">\n<meta http-equiv=Content-Type content="text/html; charset=UTF-8">\n<title>Santahacks Email</title>\n<style>@media only screen and (max-width:620px){table[class=body] h1{font-size:28px!important;margin-bottom:10px!important}table[class=body] p,table[class=body] ul,table[class=body] ol,table[class=body] td,table[class=body] span,table[class=body] a{font-size:16px!important}table[class=body] .wrapper,table[class=body] .article{padding:10px!important}table[class=body] .content{padding:0!important}table[class=body] .container{padding:0!important;width:100%!important}table[class=body] .main{border-left-width:0!important;border-radius:0!important;border-right-width:0!important}table[class=body] .btn table{width:100%!important}table[class=body] .btn a{width:100%!important}table[class=body] .img-responsive{height:auto!important;max-width:100%!important;width:auto!important}}@media all{.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:100%}.apple-link a{color:inherit!important;font-family:inherit!important;font-size:inherit!important;font-weight:inherit!important;line-height:inherit!important;text-decoration:none!important}.btn-primary table td:hover{background-color:#34495e!important}.btn-primary a:hover{background-color:#34495e!important;border-color:#34495e!important}}</style>\n</head>\n<body class style=background-color:#f6f6f6;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%>\n<table border=0 cellpadding=0 cellspacing=0 class=body style=border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;width:100%;background-color:#f6f6f6>\n<tr>\n<td style=font-family:sans-serif;font-size:14px;vertical-align:top>&nbsp;</td>\n<td class=container style="font-family:sans-serif;font-size:14px;vertical-align:top;display:block;Margin:0 auto;max-width:580px;padding:10px;width:580px">\n<div class=content style="box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px">\n<span class=preheader style=color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0>Thanks for using Santa Hacks!</span>\n<table class=main style=border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;width:100%;background:#fff;border-radius:3px>\n<tr>\n<td class=wrapper style=font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px>\n<table border=0 cellpadding=0 cellspacing=0 style=border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;width:100%>\n<tr>\n<td style=font-family:sans-serif;font-size:14px;vertical-align:top>\n<p style=font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px>Hi!</p>\n<p style=font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px>Thanks for signing up your organization to participate in a secret santa with us! When everyone has signed up, click the button below to begin matching. <br><br>Please note that once matching has begun, your signup form will no longer be available and emails will be sent to those who have signed up.</p>\n<table border=0 cellpadding=0 cellspacing=0 class="btn btn-primary" style=border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;width:100%;box-sizing:border-box>\n<tbody>\n<tr>\n<td align=left style=font-family:sans-serif;font-size:14px;vertical-align:top;padding-bottom:15px>\n<table border=0 cellpadding=0 cellspacing=0 style=border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;width:auto>\n<tbody>\n<tr>\n<td style=font-family:sans-serif;font-size:14px;vertical-align:top;background-color:#3498db;border-radius:5px;text-align:center> <a href=https://www.santahacks.com target=_blank style="display:inline-block;color:#fff;background-color:#3498db;border:solid 1px #3498db;border-radius:5px;box-sizing:border-box;cursor:pointer;text-decoration:none;font-size:14px;font-weight:bold;margin:0;padding:12px 25px;text-transform:capitalize;border-color:#3498db">Begin Matching</a> </td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n<p style=font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px>Your organization name is {{Organization}}<br><br>Share this link with people in your organization: {{link}}</p>\n<p style=font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px>Thanks for using Santa Hacks!</p>\n</td>\n</tr>\n</table>\n</td>\n</tr>\n</table>\n<div class=footer style=clear:both;Margin-top:10px;text-align:center;width:100%>\n<table border=0 cellpadding=0 cellspacing=0 style=border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;width:100%>\n<tr>\n<td class=content-block style=font-family:sans-serif;vertical-align:top;padding-bottom:10px;padding-top:10px;font-size:12px;color:#999;text-align:center>\n<span class=apple-link style=color:#999;font-size:12px;text-align:center>Santa Hacks, 2800 Waterview Parkway, Richardson TX 75080</span>\n<br> Don\'t like these emails? No worries, we won\'t send you anymore :)\n</td>\n</tr>\n</table>\n</div>\n</div>\n</td>\n<td style=font-family:sans-serif;font-size:14px;vertical-align:top>&nbsp;</td>\n</tr>\n</table>\n</body>\n</html>';

        var eParams = {
            "Source": "alerts@santahacks.com",
            "Template": "linkWorks",
            "Destination": {
                "ToAddresses": [email]
            },
            "TemplateData": json,
        }

        // Create the promise and SES service object
        var sendPromise = ses.sendTemplatedEmail(eParams).promise();

        sendPromise.then(
            function (data) {
                console.log(data);
            }).catch(
            function (err) {
                console.error(err, err.stack);
            });
    }, 1000);
};