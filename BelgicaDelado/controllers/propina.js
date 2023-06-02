const { response } = require('express');
const { Propina } = require('../models');

const getPropinas = async (req,res = response )=>{
    //GET http://localhost:3000/Propinas   ?limit=100?since=1
    const { limit = 10 , since=0 } =  req.query;
    const query = { status:true };

    const [ sum, propinas ] = await Promise.all([
        Propina.countDocuments(query),
        Propina.find(query)
        .populate('clienteRestaurante', 'nombre status')
        .populate('meseroRestaurante', 'nombre status')
        .skip(Number(since))
        .limit(Number(limit))
    ]);
  
    res.json({
      sum, 
      propinas
    });
}

const getPropina = async (req, res= response)=>{
    const {id} = req.params
    const propina=  await Propina.findById(id)
        .populate('clienteRestaurante', 'nombre status')
        .populate('meseroRestaurante', 'nombre status');
    res.json(propina);
}

const createPropina = async(req, res = response)=>{
    const { clienteRestaurante, meseroRestaurante, ...body } =  req.body;
    
    const propina = new Propina({
        clienteRestaurante,
        meseroRestaurante,
        ...body
      });
    
      const newPropina = await propina.save();
      res.status(201).json(newPropina);
    }

const updatePropina = async(req,res =  response)=>{
    const {id} = req.params;
    const { status, ...data } =  req.body;
    const propinaUpdated =  await Propina.findByIdAndUpdate(id, data, {new: true} )
    res.json(propinaUpdated);
}
const deletePropina =  async (req, res= response)=>{
    const {id} = req.params;
    const deletedPropina =  await Propina.findByIdAndUpdate(id, {status:false}, {new:true} );
    res.json(deletedPropina);
}

 module.exports ={
    createPropina,
    getPropina,
    getPropinas,
    updatePropina,
    deletePropina
 }