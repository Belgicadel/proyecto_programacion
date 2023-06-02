const { Router } = require('express')
const { check } =  require('express-validator')

const { getEquipo,
        getEquipos,
        createEquipo,
        updateEquipo,
        deleteEquipo } = require('../controllers').Equipo;

const { validateFields } = require('../middlewares');

const router = Router();

///     https://localhost:3000/Equipos/

router.get('/', getEquipos);

router.get('/:id', [ 
    check('id', 'Este no es un ID de Mongo correcto').isMongoId() 
 ], getEquipo);

router.post('/',[
    check('name', 'El nombre es requerido').not().isEmpty(),
    validateFields
] , createEquipo)

router.put('/:id', updateEquipo)

router.delete('/:id',[
    check('id','Debe ser un id de mongo VALIDO').isMongoId()
], deleteEquipo)

module.exports = router;