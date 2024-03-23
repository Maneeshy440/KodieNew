// controller.js
const Contact = require('../model/add_tenant.modal');

const ContactController = {
  createContact: (req, res) => {
    const contactData = req.body;

    // console.log(contactData)
    Contact.create(contactData, (err, result) => {

      if (err) {
        console.error('Error creating contact:', err);
        res.status(500).json({ error: 'Error creating menually tenant..' });
      }
      else if (result[0][0].response === "fail") {
        res.status(201).json({
          id: result.ATD_KEY,
          status: ' Email already exists for  person tenant'

        });
      }
      else {

        res.status(201).json({
          id: result.ATD_KEY,
          status: "creating menually tenant person successfull"

        });
      }
    });
  },

  companycontact: (req, res) => {
    const contactData = req.body;

    console.log(contactData)
    Contact.company(contactData, (err, result) => {
      console.log(err)
      console.log(result)
      if (err) {
        console.error('Error creating contact:', err);
        res.status(500).json({ error: 'Error creating menually tenant..' });
      }
      else if (result[0][0].response === "fail") {
        res.status(201).json({
          id: result.ATD_KEY,
          status: ' Email already exists for company tenant'

        });
      }
      else {

        res.status(201).json({
          id: result.ATD_KEY,
          status: "creating menually tenant company successfull"

        });
      }
    });
  },


};

module.exports = ContactController;
