const { Router } = require('express')
const { check } =  require('express-validator')

const { createMesero,
        getMesero, 
        getMeseros,
        updateMesero,
        deleteMesero } = require('../controllers').Mesero;

const { validateFields } = require('../middlewares')

const router = Router();

///     https://localhost:3000/api/v1/mesero/

router.get('/', getMeseros);

router.get('/:id', [ 
    check('id', 'Este no es un ID de Mongo correcto').isMongoId() 
 ]  , getMesero);

router.post('/',[
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    validateFields
] , createMesero)

router.put('/:id', updateMesero)

router.delete('/:id',[
    check('id','Debe ser un id de mongo VALIDO').isMongoId()
], deleteMesero)

module.exports = router;