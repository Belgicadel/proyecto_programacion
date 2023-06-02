const { Router } = require('express')
const { check } =  require('express-validator')

const { createCliente,
        getCliente, 
        getClientes,
        updateCliente,
        deleteCliente } = require('../controllers').Cliente;

const { validateFields } = require('../middlewares')

const router = Router();

///     https://localhost:3000/api/v1/clientes/

router.get('/', getClientes);

router.get('/:id', [ 
    check('id', 'Este no es un ID de Mongo correcto').isMongoId() 
 ]  , getCliente);

router.post('/',[
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    validateFields
] , createCliente)

router.put('/:id', updateCliente)

router.delete('/:id',[
    check('id','Debe ser un id de mongo VALIDO').isMongoId()
], deleteCliente)

module.exports = router;