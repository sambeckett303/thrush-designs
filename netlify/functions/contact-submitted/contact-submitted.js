const sgMail = require('@sendgrid/mail');

exports.handler = async (event) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const formData =  new URLSearchParams(event.body);

    // Create the email content
    const msg = {
        to: 'sambeckett303@gmail.com',
        from: 'donotreply@thrushdesigns.art',
        subject: 'New Website Contact Request',
        text:
        `Name: ${formData.get('name')}
        Email: ${formData.get('email')}
        Phone: ${formData.get('phone')}
        How did they find you? ${formData.get('find')}
        Message: ${formData.get('message')}`
    };

    try {
        // Send the email
        await sgMail.send(msg);
        return {
            statusCode: 200,
            body: 'Email sent successfully!',
        };
    } catch (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body)
        }
        return {
            statusCode: error.code,
            body: JSON.stringify({msg: error.message}),
        };
    }
};