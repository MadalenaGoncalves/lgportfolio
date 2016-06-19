var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

exports.sendMail = function(req, res) {
    console.log('@contactFormHandler.sendMail()');
    var data = req.body;
    transporter.sendMail({
        from: data.email,
        to: 'madalena.pg@gmail.com',
        subject: 'LuGo message from ' + data.name,
        text: data.message
    });

    resp.json(data);
}

// app.post('/contact', function (req, res) {
//   var mailOpts, smtpTrans;
//   //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
//   smtpTrans = nodemailer.createTransport('SMTP', {
//       service: 'Gmail',
//       auth: {
//           user: "me@gmail.com",
//           pass: "application-specific-password" 
//       }
//   });
//   //Mail options
//   mailOpts = {
//       from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
//       to: 'me@gmail.com',
//       subject: 'Website contact form',
//       text: req.body.message
//   };
//   smtpTrans.sendMail(mailOpts, function (error, response) {
//       //Email not sent
//       if (error) {
//           res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
//       }
//       //Yay!! Email sent
//       else {
//           res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
//       }
//   });
// });