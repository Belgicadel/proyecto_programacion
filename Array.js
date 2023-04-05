const{mesero,cliente,Propina}=require("./entidades");
let meseros = [
    new mesero(1,"MAXIMILIANO"),
    new mesero(2,"LEONEL"),
    new mesero(3,"BRADYS"),
    new mesero(4,"JAVIER"),
    new mesero(5,"NELSON")
  ]
let Clientes = [
    new cliente(1,"JOFFRE",0001),
    new cliente(2,"DAMIAN",0002),
    new cliente(3,"SAID",0003),
    new cliente(4,"RONAL",0004),
    new cliente(5,"ANGEL",0005)
  ]
let propinas = [
    new Propina(1,2,2,"4/4/2023","08:00",1.00),
    new Propina(2,3,1,"6/5/2024","09:00",1.50),
    new Propina(3,4,4,"5/6/2012","12:00",0.50),
    new Propina(4,5,5,"7/4/2023","07:00",0.75),
    new Propina(5,4,3,"2/5/2019","10:00",1.00)
  ]
  module.exports={
    meseros,
    Clientes,
    propinas
}