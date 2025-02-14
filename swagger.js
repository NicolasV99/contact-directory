// swagger.js
const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Contact Directory API",
        description: "API to manage a contact directory",
    },
    host: "localhost:3000",
    schemes: ["http"],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
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

