const { response } = require('express')
const { Cliente } = require('../models')

const getClientes= async (req, res = response )=>{
    const { limit = 10 , since=0 } =  req.query;
    const query = { status:true };

    const [ sum, clientes ] = await Promise.all([
        Cliente.countDocuments(query),
        Cliente.find(query).skip(Number(since)).limit(Number(limit))
    ])
  
    res.json({
      sum, 
      clientes
    })
    
};

const getCliente= async (req, res =  response)=>{
    const {id} = req.params
    const cliente=  await Cliente.findById(id).populate('cliente');
    res.json(cliente);
};

const createCliente = async (req, res = response)=>{
    const { status, ...body } =  req.body;
    
    const existCliente =  await Cliente.findOne({nombre: body.nombre})

    if (existCliente)
    {
        return res.status(400).json({
            msg:`El cliente ${ existCliente.nombre } ya existe`
        })
    }

    const data = {
        ...body,
        nombre: body.nombre
    }

    const cliente = new Cliente(data);
    const newCliente =  await cliente.save();
    res.status(201).json(newCliente);
};

const updateCliente= async (req, res=response)=>{
    const {id} = req.params;
    const { status, ...data } =  req.body;

    const updatedCliente =  await Cliente.findByIdAndUpdate(id, data, {new: true} )
    res.json(updatedCliente);
};
const deleteCliente= async (req, res = response)=>{
    const {id} = req.params;
    const deletedCliente =  await Cliente.findByIdAndUpdate(id, {status:false}, {new:true} );
    res.json(deletedCliente);
};

module.exports = {
    getCliente,
    getClientes,
    createCliente,
    updateCliente,
    deleteCliente
};