const { model, Schema } = require('mongoose');

const TorneoSchema = Schema (
{   
    id: {
        type: Number,
        required: true
    },
    
    descripcion: {
        type: String,
        required: true
    
    },
    status:{
        type: Boolean,
        default: true,
        required:true
    }


});

TorneoSchema.methods.toJSON = function(){
    const { __v,  status,  ...data   } =  this.toObject();
    return data;
}
module.exports = model('Torneo', TorneoSchema );