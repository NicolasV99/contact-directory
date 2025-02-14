const app = require('../server'); 
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Database is listening and Node.js running on port ${port}`);
});
