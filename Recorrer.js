const{meseros,Clientes,propinas}=require("./Array");
function visualizarMesero() {
    for (const mesero of meseros) {
      console.log(`ID MESERO: ${mesero.id}
      NOMBRE DE MESERO: ${mesero.nombreMesero}`
      );
    }
  }; 


const  visualizarClientes = () => {
    Clientes.forEach((cliente) => {
      console.log(`ID CLIENTE: ${cliente.id}
      NOMBRE DE CLIENTE: ${cliente.nombreCliente}
      IDENTIFICACIÓN: (${cliente.Identificacion})`
      );
    });
  }; 


const  visualizarPropina = () => {
    let i=0; 
    while(i< propinas.length){ 
     let cliente1 = propinas.find(Propina=>Propina.id ===propinas[i].idCliente)
     let mesero1 = meseros.find(meseros=>meseros.id ===propinas[i].idmesero)
      console.log(`ID PROPINA: ${propinas[i].id }
      ID DE MESERO: ${mesero1.id}
      ID DE CLIENTE: ${cliente1.idCliente}
      fECHA: ${propinas[i].fecha}
      HORA: ${propinas[i].hora}
      VALORPRO: ${propinas[i].valorpro}`)
      i++;}
  }; module.exports={
    visualizarClientes,
    visualizarMesero,
    visualizarPropina
}