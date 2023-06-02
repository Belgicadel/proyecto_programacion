const { Router } = require('express')
const { check } =  require('express-validator')

const { createTorneo,
        getTorneo,
        getTorneos,
        updateTorneo,
        deleteTorneo } = require('../controllers').Torneo;

const { validateFields } = require('../middlewares')

const router = Router();

///     https://localhost:3000/api/v1/clientes/

router.get('/', getTorneos);

router.get('/:id', [ 
    check('id', 'Este no es un ID de Mongo correcto').isMongoId() 
 ]  , getTorneo);



router.post('/',[
    check('descripcion', 'El nombre es requerido').not().isEmpty(),
    validateFields
] , createTorneo)

router.put('/:id', updateTorneo)

router.delete('/:id',[
    check('id','Debe ser un id de mongo VALIDO').isMongoId()
], deleteTorneo)

module.exports = router;