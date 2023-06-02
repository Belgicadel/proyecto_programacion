const { response } = require('express')
const { Partido } = require('../models')

const getPartidos = async (req, res = response) => {
  //GET http://localhost:3000/Partidos   ?limit=100?since=1
  const { limit = 10 , since = 0 } = req.query;
  const query = { status: true };

  const [sum, partidos] = await Promise.all([
    Partido.countDocuments(query),
    Partido.find(query)
      .populate('equipoLocal', 'name status')
      .populate('equipoVisitante', 'name status')
      .populate('torneo', 'descripcion status')
      .skip(Number(since))
      .limit(Number(limit))
  ]);

  res.json({
    sum,
    partidos
  });
}

const getPartido = async (req, res = response) => {
  const { id } = req.params;
  const partido = await Partido.findById(id)
    .populate('equipoLocal', 'name status')
    .populate('equipoVisitante', 'name status')
    .populate('torneo', 'descripcion status');
  res.json(partido);
}

const createPartido = async (req, res = response) => {
  const { equipoLocal, equipoVisitante, torneo, ...body } = req.body;

  const partido = new Partido({
    equipoLocal,
    equipoVisitante,
    torneo,
    ...body
  });

  const newPartido = await partido.save();
  res.status(201).json(newPartido);
}

const updatePartido = async (req, res = response) => {
  const { id } = req.params;
  const { status, ...data } = req.body;
  const updatedPartido = await Partido.findByIdAndUpdate(id, data, { new: true });
  res.json(updatedPartido);
}

const deletePartido = async (req, res = response) => {
  const { id } = req.params;
  const deletedPartido = await Partido.findByIdAndUpdate(id, { status: false }, { new: true });
  res.json(deletedPartido);
}

module.exports = {
  getPartido,
  getPartidos,
  createPartido,
  updatePartido,
  deletePartido
};
