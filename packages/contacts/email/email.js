const client = require('@sendgrid/client');
require('dotenv').config()
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_LIST_ID = process.env.SENDGRID_LIST_ID;
client.setApiKey(SENDGRID_API_KEY);

exports.main = (args) => {
  const data = {
    list_ids: [SENDGRID_LIST_ID],
    contacts: [
      {
        email: args.email
      }
    ]
  };
  
  const request = {
    url: `/v3/marketing/contacts`,
    method: 'PUT',
    body: data
  }
  
  return client.request(request)
    .then(([response, body]) => {
      console.log(response.statusCode);
      console.log(response.body);
      return { body: { message: 'Contact successfully saved' } };
    })
    .catch(error => {
      console.error(error);
      return { error: error.response.body }; 
    });
}
