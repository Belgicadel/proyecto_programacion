const { model, Schema } = require('mongoose');

const PropinaSchema = Schema(
    {
        id: {
            type: String,
            required: true
        },
        // Atributos propios
        valor:{
            type: String,
            required:true
        },
        status:{
            type: Boolean,
            default: true,
            required:true
        },
        // Atributos relacionales
        clienteRestaurante: {
            type: Schema.Types.ObjectId, 
            ref: 'cliente',
            required: false
        },
        meseroRestaurante: {
            type: Schema.Types.ObjectId, 
            ref: 'mesero',
            required: false
        }
    }
);
PropinaSchema.methods.toJSON = function(){
    const { __v,  status,  ...data   } =  this.toObject();
    return data;
}

module.exports = model('Propina', PropinaSchema );