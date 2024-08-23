const mongoose = require('mongoose');
const Company = require("../models/company")

const renderTemplate = async (req, reply) => {
  try {
    const {slug} = req.query;
    console.log(slug,'slug')
    const company = await Company.findOne().where('slug', slug).equals(slug);


    if (!company) {
      reply.status(404).send('Not Found');
      return;
    }

    const sectionMap = {
      "header 1": '../views/header/header1.ejs',
      "footer 1": "../views/footer/footer1.ejs",
    };

    // company.sections.sort((a, b) => a.order - b.order);
    const data = { ...company.toObject(), url: process.env.BASE_URL + req.url };
    
    reply.view('./views/render.ejs', { data, sectionMap });

    console.log("sadasdasd");
    // return data;
    // return sectionMap;
     return(reply.view('./views/render.ejs', { data, sectionMap }));

  } catch (err) {
    console.error(`Error: ${err}`);
    reply.status(500).send('Internal Server Error');
  }
};

module.exports = renderTemplate;
