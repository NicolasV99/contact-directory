const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contact Directory Api',
        description: 'Contact Directory Api'
    },
    host: 'localhost:3000',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//generate a swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
