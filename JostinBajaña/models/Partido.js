const { model, Schema } = require('mongoose');

    const PartidoSchema = Schema(
      {
    
        id: {
            type: Number,
            required: true
        },
        // relaciones
        equipoLocal: { 
          type: Schema.Types.ObjectId, 
          ref: 'Equipo',
          required: false
        },

        equipoVisitante: { 
          type: Schema.Types.ObjectId,
          ref: 'Equipo',
          required: false 
        },
        
        torneo: { 
          type:Schema.Types.ObjectId,
          ref: 'Torneo',
          required: false 
        },

        // atributos propios
        Observaciones: {
            type: String,
            required: true
        },
        
        resultadoLocal: {
            type: Number,
            required: true
        },

        resultadoVisitante: {
            type: Number,
            required: true
        }
        
  });

  PartidoSchema.methods.toJSON = function(){
    const { __v,  status,  ...data   } =  this.toObject();
    return data;
}

module.exports = model('Partido', PartidoSchema );