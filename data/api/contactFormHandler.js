var nodemailer = require('nodemailer');

exports.sendMail = function(req, res) {
    console.log('@contactFormHandler.sendMail()');

    var transporter = nodemailer.createTransport('smtps://madalena.pg%40gmail.com:xgaqlflwdhbznkkm@smtp.gmail.com');
    var mailOptions = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;',
        to: 'madalena.pg@gmail.com',
        subject: 'LuGo message from ' + req.body.name,
        text: req.body.message
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
        res.json(req.body);
    });
};