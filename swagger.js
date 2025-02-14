// swagger.js
const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Contact Directory API",
        description: "API to manage a contact directory",
    },
    host: "contact-directory-17pq.onrender.com",
    schemes: ["https"],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "https",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [{ bearerAuth: [] }], // Aplica seguridad globalmente
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js", "./routes/auth.js"];

// Generar el swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

