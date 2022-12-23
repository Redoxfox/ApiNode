

function separarGoles(textMarcador){
    golesEqps=textMarcador.split("-");
    objGoles = {
        golEq1:parseInt(golesEqps[0],10),
        golEq2:parseInt(golesEqps[1],10)
    }
    return  objGoles
}

function separarEquipos(textEquipos, nombreEqipos){
    equipos=textEquipos.split("-");
    //var nombreEqipos = JSON.parse(nombreEquipos)
    nombreEqipos.find((e) => e.nombre == equipos[0]); 
    const nuevoArr =  nombreEqipos.map((e) => e.nombre);
    
    let cont = 0
    let n = 0
    let idx = 0
    let idx1 =0
    while (n < nuevoArr.length) {
      cadena = nuevoArr[cont]
      let  Aciertos = 0  
      let  porcetajeAcierto = 0
      let  Aciertos1 = 0  
      let  porcetajeAcierto1 = 0
      let j=0
      for (var i=0; i < cadena.length; i++) {
        if (i < cadena.length && i < equipos[0].length ) {
          if (equipos[0][i]===cadena[i]) {
                Aciertos = Aciertos + 1
                porcetajeAcierto = equipos[0].length-Aciertos
            if (porcetajeAcierto===1) {
                for (let index = 0; index < nombreEqipos.length; index++) {
                  if (nombreEqipos[index]["nombre"]===cadena) {
                    console.log(nombreEqipos[index]["nombre"])
                    idx=index
                  } 
                }
              }
          } 
        } 
      } 
      cont ++;
      n ++;
    }
    cont=0;
    n=0;
    while (n < nuevoArr.length) {
      cadena = nuevoArr[cont]
      let  Aciertos1 = 0  
      let  porcetajeAcierto1 = 0
      for (var i=0; i < cadena.length; i++) {
        
        if (i < cadena.length && i < equipos[1].length ) {
             
          if (equipos[1][i+1]===cadena[i]) {
                Aciertos1 = Aciertos1 + 1
                porcetajeAcierto1 = equipos[1].length-Aciertos1
            if (porcetajeAcierto1<=1) {
                for (let index = 0; index < nombreEqipos.length; index++) {
                  if (nombreEqipos[index]["nombre"]===cadena) {
                    console.log(nombreEqipos[index]["nombre"])
                    idx1=index
                  } 
                }
              }
          } 
        } 
      }
      cont ++;
      n ++;
    }
    
   
    objEquipos = {
        eq1:nombreEqipos[idx]["id"],
        eq2:nombreEqipos[idx1]["id"]
    }
    return objEquipos
  }

  function separarFechaEstado(textFecha){
    let meses = ["Ene", "Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"]
    cFechaPartido=textFecha.split(" ");
    let dia = parseInt(cFechaPartido[0],10)
    let estado = cFechaPartido[3] 
    let mes = meses.indexOf(cFechaPartido[1])+1
    let anio = "20"+cFechaPartido[2].substring(0,2);
    let fechaPartido = anio+"-"+mes+"-"+dia
    //new Date(fechaPartido)
    objFechaEstado = {
        estado:estado,
        fecha:fechaPartido
    }
    return objFechaEstado
 }



 module.exports={separarGoles:separarGoles,separarEquipos:separarEquipos,separarFechaEstado:separarFechaEstado
                }