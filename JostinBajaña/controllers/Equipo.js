const { response } = require('express')
const { Equipo } = require('../models')

const getEquipos = async (req, res = response) => {
  const { limit = 10, since = 0 } = req.query;
  const query = { status: true };

  const [sum, equipos] = await Promise.all([
    Equipo.countDocuments(query),
    Equipo.find(query).skip(Number(since)).limit(Number(limit))
  ]);

  res.json({
    sum,
    equipos
  });
};

const getEquipo = async (req, res = response) => {
  const { id } = req.params;
  const equipo = await Equipo.findById(id).populate('equipo');
  res.json(equipo);
};

const createEquipo = async (req, res = response) => {
  const { status, ...body } = req.body;

  const existEquipo = await Equipo.findOne({ name: body.name });

  if (existEquipo) {
    return res.status(400).json({
      msg: `El Equipo ${existEquipo.name} ya existe`
    });
  }

  const data = {
    ...body,
    name: body.name
  };

  const newEquipo = new Equipo(data);
  const createdEquipo = await newEquipo.save();
  res.status(201).json(createdEquipo);
};

const updateEquipo = async (req, res = response) => {
  const { id } = req.params;
  const { status, ...data } = req.body;

  const updatedEquipo = await Equipo.findByIdAndUpdate(id, data, { new: true });
  res.json(updatedEquipo);
};

const deleteEquipo = async (req, res = response) => {
  const { id } = req.params;
  const deletedEquipo = await Equipo.findByIdAndUpdate(id, { status: false }, { new: true });
  res.json(deletedEquipo);
};

module.exports = {
  getEquipo,
  getEquipos,
  createEquipo,
  updateEquipo,
  deleteEquipo
};
