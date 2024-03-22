const sgMail = require('@sendgrid/mail');
const formidable = require('formidable');

exports.handler = async (event) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const form = new formidable.IncomingForm();

    return new Promise((resolve, reject) => {
      form.parse(event, (err, fields, files) => {
        if (err) {
          return reject({ statusCode: 500, body: 'Form parsing error' });
        }
        const msg = {
            to: 'sambeckett303@gmail.com',
            from: 'donotreply@thrushdesigns.art',
            subject: 'New Website Contact Request',
            text:
            `Name: ${fields.name}
            Email: ${fields.email}
            Phone: ${fields.phone}
            How did they find you? ${fields.find}
            Message: ${fields.message}`
        };
        sgMail.send(msg)
          .then(() => {
            resolve({
              statusCode: 200,
              body: 'Email sent successfully!',
            });
          })
          .catch((err) => {
            console.error(error);
            if (error.response) {
              console.error(error.response.body)
            }
            reject({
                statusCode: error.code,
                body: JSON.stringify({msg: error.message}),
            });
          });
      });
    });
};