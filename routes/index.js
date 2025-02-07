//const passport = require('passport');
const router = require('express').Router();
router.use('/', require('./swagger'));


router.get('/', (req, res) => { 
    //#Swagger.tags=['Hello World']
    res.send('Hello');
});

router.use('/contacts', require('./contacts'));
router.use('/clients', require('./clients'));
router.use('/companies', require('./companies'));
router.use('/employees', require('./employees'));

module.exports = router;