const express= require('express')
const routes=express.Router()
const itemCalendar= require('./models/itemCalendar')
const puppeteer = require('puppeteer');
const conversions=require('./helpers/conversion')

routes.get('/',(req,res)=>{
    req.getConnection((err,conn)=>{
        if (err) {
            res.send(err)
        }
        conn.query('SELECT * FROM proyecto.casa',(err,rows)=>{
            if (err) {
                res.send(err)
            }
            res.json(rows)
        })
    })
})

routes.post('/',(req,res)=>{
    req.getConnection((err,conn)=>{
        if (err) {
            res.send(err)
        }
        conn.query('INSERT INTO proyecto.casa SET ?',[req.body],(err,rows)=>{
            if (err) {
                res.send(err)
            }
            res.json(rows)
        })
    })
})

routes.get('/fecha',(req,res)=>{
    req.getConnection((err,conn)=>{
        if (err) {
            res.send(err)
        }
        //console.log
        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            //await page.goto(`data:text/html,${html}`);
            const urlp = req.query.urlDate;
            //console.log(urlp);
            url =req.query.urlDate;
            let arrayJor=url.split('/')
            let numJor=arrayJor[arrayJor.length-1]
            //console.log(numJor.substring(7, numJor.length))

            //url = 'https://www.resultados-futbol.com/apertura_colombia/grupo1/jornada7'
            let nrofecha = parseInt(numJor.substring(7, numJor.length),10);
            //let nrofecha=1
            await page.goto(url)
          
            let arrayFecha = []
            const marcadores = await page.evaluate(() => {
              const tds = Array.from(document.querySelectorAll('.clase'))
              return tds.map(td => td.innerText)
            });
        
            //console.log(marcadores)
          
            const data = await page.evaluate(() => {
              const tds1 = Array.from(document.querySelectorAll('.summary'))
              return tds1.map(td => td.innerText)
            });
          
            const fechas = await page.evaluate(() => {
              const tds1 = Array.from(document.querySelectorAll('.fecha'))
              return tds1.map(td => td.innerText)
            });
            let nombre=[]
            const id_liga = 7   
            const rows = conn.query(`SELECT id, id_liga, nombre, estado FROM equipos where id_liga=${id_liga}
             and estado='ACTIVADO' `,(err,rows)=>{
                cont = 0
                //const textEquipos = data[index];
                for (let index = 0; index < marcadores.length; index++) {
                    const textMarcador = marcadores[index];
                    const textEquipos = data[index];
                    const textFecha = fechas[index];
                    
                    //console.log(Object.keys(rows["_resultSet"]))
                    //var result = rows["nombre"]
                    //console.log(result)
                    //for (const items in rows) {
                       // console.log(`${items}`);
                     // }
                    
                    equiposPartido=conversions.separarEquipos(textEquipos, rows)
                    golesEquipos=conversions.separarGoles(textMarcador)
                    fechaEncuentro=conversions.separarFechaEstado(textFecha)
                    id=0
                    console.log(fechaEncuentro.estado);
                    if (fechaEncuentro.estado==undefined) {
                        fechaEncuentro.estado="Revisar"
                    }
                    datopartido=itemCalendar.datopartido(id,nrofecha,id_liga,equiposPartido.eq1,golesEquipos.golEq1,equiposPartido.eq2,
                        golesEquipos.golEq2,equiposPartido.eq1,equiposPartido.eq2,fechaEncuentro.estado,"2022",fechaEncuentro.fecha)
                        /*conn.query('INSERT INTO proyecto.casa SET ?',[datopartido],(err,rows)=>{
                            if (err) {
                                res.send(err)
                            }
                            res.json(rows)
                        })*/
                    //console.log(datopartido)
                    //console.log(equiposPartido);
                    //console.log(golesEquipos);
                    //console.log(fechaEncuentro);
                    nombre.push(datopartido);
                    fila += 1
                }
                res.json(nombre)
            })
            
            let fila = 0
            //let id = 7817
         
            await browser.close();
          })();
       /* if (err) {
            res.send(err)
        }
        res.json(rows)
        conn.query('INSERT INTO proyecto.calendario SET ?',[req.body],(err,rows)=>{
            if (err) {
                res.send(err)
            }
            res.json(rows)
        })*/
    })
})


module.exports=routes