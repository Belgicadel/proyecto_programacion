const { model, Schema } = require('mongoose');

const ClienteSchema = Schema(
    {
        id: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        telefono: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        ciudad: {
            type: String,
            required: true
        },
        direccion: {
            type: String,
            required: true
        },
        status:{
            type: Boolean,
            default: true,
            required:true
        }
    }
);

ClienteSchema.methods.toJSON = function(){
    const { __v,  status,  ...data   } =  this.toObject();
    return data;
}

module.exports = model('Cliente', ClienteSchema );