const sgMail = require('@sendgrid/mail');

// const sendGridAPIKey = '';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email,name) =>{
    sgMail.send({
        to:email,
        from:'kanyalshiva1@gmail.com',
        subject:'Thanks for joining in!.',
        text:`Welcme to the app , ${name}. i hope you will enjoy our service...`
    })
}

const sendByeEmial = (email,name) =>{
    sgMail.send({
        to:email,
        from:'kanyalshiva1@gmail.com',
        subject:'Sorry if you are not happy with our service',
        text:`hello ${name}I hope you would have enjoyer our service`       
    })
}


module.exports = {
    sendWelcomeEmail,
    sendByeEmial
}