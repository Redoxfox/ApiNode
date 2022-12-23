function datopartido (id, nroFecha,idLiga,equipo1,golEq1,equipo2,golEq2,localEq1,localEq2,estado,temporada,fecha) {
    objFecha={"id":id,
              "nro_fecha":nroFecha,
              "id_liga":idLiga,
              "equipo_1":equipo1,
              "gol_eq1":golEq1,
              "equipo_2":equipo2,
              "gol_eq2":golEq2,
              "local_eq1":localEq1,
              "local_eq2":localEq2,
              "estado":estado,
              "temporada":temporada,
              "fecha":fecha
            }   
            
    return objFecha
}

exports.datopartido=datopartido  