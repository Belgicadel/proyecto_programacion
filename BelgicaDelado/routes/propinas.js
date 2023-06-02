const { Router } = require('express');
const { check } =  require('express-validator')

const {
        createPropina,
        getPropina,
        getPropinas,
        updatePropina,
        deletePropina    } = require('../controllers').Propina;

const { validateFields } = require('../middlewares')

const router= Router();

router.get('/', getPropinas );
router.get('/:id'
,check('id', 'Este no es un ID de Mongo correcto').isMongoId()
 , getPropina );

 router.post('/',[
    check('', 'EL nombre es requerido').not().isEmpty(),
    validateFields
], createPropina);


 router.put('/:id', updatePropina);

 router.delete('/:id',[
    check('id','Debe ser un id de mongo VALIDO').isMongoId()
], deletePropina);

module.exports = router;