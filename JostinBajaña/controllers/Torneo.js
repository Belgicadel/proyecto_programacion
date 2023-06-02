const { response } = require('express');
const { Torneo } = require('../models');


const getTorneos = async (req,res = response )=>{
    const { limite = 10 , desde=0 } =  req.query;
    const query = { status:true };

    const [ sum, Torneos ] = await Promise.all([
        Torneo.countDocuments(query),
        Torneo.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
  
    res.json({
      sum, 
      Torneos
    })
}

const getTorneo = async (req, res= response)=>{
    const {id} = req.params
    const torneo =  await Torneo.findById(id);
    res.json(torneo);
}
const createTorneo = async(req,res=response)=>{
    const { status, ...body } =  req.body;
    
    const existTorneo =  await Torneo.findOne({descripcion: body.descripcion})

    if (existTorneo)
    {
        return res.status(400).json({
            msg:`EL Torneo ${ existeTorneo.descripcion } ya existe`
        })
    }

    const data = {
        ...body,
        descripcion: body.descripcion
    }

    const torneo = new Torneo(data);

    const newTorneo =  await torneo.save();
    res.status(201).json(newTorneo);
}
const updateTorneo = async(req,res =  response)=>{
    const {id} = req.params;
    const { status, ...data } =  req.body;
    const TorneoUpdated =  await Torneo.findByIdAndUpdate(id,data, {new: true} )
    res.json(TorneoUpdated);
}
const deleteTorneo =  async (req, res= response)=>{
    const {id} = req.params;
    const deletedTorneo =  await Torneo.findByIdAndUpdate(id, {status:false}, {new:true} );
    res.json(deletedTorneo);
}

 module.exports ={
    createTorneo,
    getTorneo,
    getTorneos,
    updateTorneo,
    deleteTorneo
 }