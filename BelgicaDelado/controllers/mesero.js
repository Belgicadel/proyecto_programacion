const { response } = require('express')
const { Mesero } = require('../models')


const getMeseros= async (req, res = response )=>{
    const { limit = 10 , since=0 } =  req.query;
    const query = { status:true };

    const [ sum, meseros ] = await Promise.all([
        Mesero.countDocuments(query),
        Mesero.find(query).skip(Number(since)).limit(Number(limit))
    ])
  
    res.json({
      sum, 
      meseros
    })
    
};

const getMesero= async (req, res =  response)=>{
    const {id} = req.params
    const mesero=  await Mesero.findById(id);
    res.json(mesero);
};

const createMesero= async (req, res = response)=>{
    const { status, user, ...body } =  req.body;
    
    const existMesero =  await Mesero.findOne({nombre: body.nombre})

    if (existMesero)
    {
        return res.status(400).json({
            msg:`El mesero ${ existMesero.nombre } ya existe`
        })
    }

    const data = {
        ...body,
        nombre: body.nombre
    }

    const mesero = new Mesero(data);

    const newMesero =  await mesero.save();
    res.status(201).json(newMesero);
};

const updateMesero= async (req, res=response)=>{
    const {id} = req.params;
    const { status, ...data } =  req.body;
    const updatedMesero =  await Mesero.findByIdAndUpdate(id,data, {new: true} )
    res.json(updatedMesero);
};

const deleteMesero= async (req, res = response)=>{
    const {id} = req.params;
    const deletedMesero =  await Mesero.findByIdAndUpdate(id, {status:false}, {new:true} );
    res.json(deletedMesero);
};

module.exports = {
    getMesero,
    getMeseros,
    createMesero,
    updateMesero,
    deleteMesero
};