'use strict';
const AWS = require('aws-sdk')
const ses = new AWS.SES()

module.exports.createContact = async (event) => {

  const { to, from, subject, message} = JSON.parse(event.body)

  if(!to || !from || !subject || !message) {

    return{
      statusCode: 400,
      body: JSON.stringify({
        message: 'Erro na requisicao ...'
      })
    }
  }

  const params = {
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Body: {
        Text: {Data: message}
      },
      Subject: {Data: subject}
    },
    Source: from
  }

  try {
    await ses.sendEmail(params).promise()

    return{
      statusCode: 200,
      body: JSON.stringify({
        message: 'Email enviado com sucesso',
        sucess: true
      })
    }
  } catch (error) {
    console.error(error);
    return{
      statusCode: 400,
      body: JSON.stringify({
        message: 'Erro ao enviar email',
        sucess: false,
        type: error
      })
    }
  }
};
