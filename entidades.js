function mesero(id,nombreMesero)
{
  this.id=id,
  this.nombreMesero=nombreMesero
};
function cliente(id,nombreCliente,Identificacion)
{
  this.id=id,
  this.nombreCliente=nombreCliente,
  this.Identificacion=Identificacion
};
function Propina(id,idmesero,idCliente,fecha,hora,valorpro)
{
  this.id=id,
  this.idmesero=idmesero,
  this.idCliente=idCliente,
  this.fecha=fecha,
  this.hora=hora,
  this.valorpro=valorpro
};
module.exports={
    mesero,
    cliente,
    Propina
}