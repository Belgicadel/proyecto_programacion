const { Router } = require('express');
const { check } =  require('express-validator')


const {
        getPartido,
        getPartidos,
        createPartido,
        updatePartido,
        deletePartido   } = require('../controllers').Partido;

const { validateFields } = require('../middlewares')

const router= Router();

router.get('/', getPartidos );
router.get('/:id'
,check('id', 'Este no es un ID de Mongo correcto').isMongoId()
 , getPartido);

 router.post('/',[
    check('', 'EL nombre es requerido').not().isEmpty(),
    validateFields
], createPartido);


 router.put('/:id', updatePartido);

 router.delete('/:id',[
    check('id','Debe ser un id de mongo VALIDO').isMongoId()
], deletePartido);



module.exports = router;