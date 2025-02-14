export default function POST(req, res) {
    var { name, contact } = req.body;
    let nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: "code91.website@gmail.com",
        pass: "bapmehcronmdhpew",
     },
      port: 465,
      host: "smtp.gmail.com",
    });
    var mailist = ['parveenemail@gmail.com'
   // 'code91.co@gmail.com',
    //'shraddha.initial@gmail.com',
    //'shraddha@code91.co',
    //'code91.placements@gmail.com'
    ]
    const mailData = {
      from: "code91.website@gmail.com",
      to: mailist ,
      subject: "Message from the CODE91 Website (HOME)",
      text: "Plaintext version of the message",
      html: `<h3>Name of the client : ${name} </h3>
             <h3>Phone number of the client : ${contact} </h3>`,
    };
  
    transporter.sendMail(mailData, function (err, info) {
      if (err) {
        console.log(err);
        res.status(400).send({'data':'Email not sent'});
      } else {
        console.log(info)
        res.status(200).send({'data':'Email  sent'})};
    });
  }
  