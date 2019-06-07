const { ipcRenderer } = require("electron");
require("./js/sweetalert2@8");

var cedula = document.getElementsByClassName('cedula')[0];
var carga = document.getElementsByClassName('carga')[0];
var verificado = document.getElementsByClassName('verificado')[0];
var rechazado = document.getElementsByClassName('rechazado')[0];
var noAceptado = document.getElementsByClassName('noAceptado')[0];

var knex = require("knex")({
    client: "sqlite3",
    connection: {
      filename: "./database.sqlite3"
    },
    useNullAsDefault: true
  });
  var idens = [];
  var gens = [];
  var asis = [];
  var sincro = [];

  knex
  .from("suroeste")
  .select("*")
  .then(rows => {
    for (row of rows) {
  
        idens[row['identificacion']] = row['identificacion'];
        gens[row['identificacion']] = row['gen'];
        asis[row['identificacion']] = row['asistencia'];
        sincro[row['identificacion']] = row['sincronizar'];
         
    }
  })
  .catch(err => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });

  cedula.setAttribute('style','display: block !important; text-align:center;')

function verifi(c){

      if(event.keyCode == 13 || event.keyCode == 32){
        c.value = "";
      }

      if(idens[c.value] == c.value && gens[c.value] == "0" && c.value!= ""){
      noAceptado.setAttribute('style','display: block !important; text-align:center;');
      cedula.setAttribute('style','display: none !important;');
      carga.setAttribute('style','display: none !important;');
      rechazado.setAttribute('style','display: none !important;');
      verificado.setAttribute('style','display: none !important;');

      setTimeout(function(){
      c.value = "";
      cedula.setAttribute('style','display: block !important; text-align:center;');
      verificado.setAttribute('style','display: none !important;');
      carga.setAttribute('style','display: none !important;');
      rechazado.setAttribute('style','display: none !important;');
      noAceptado.setAttribute('style','display: none !important;');},2000);
    }else if(c.value == idens[c.value] && gens[c.value] == "1"){
      verificado.setAttribute('style','display: block !important; text-align:center;');
      cedula.setAttribute('style','display: none !important;');
      carga.setAttribute('style','display: none !important;');
      rechazado.setAttribute('style','display: none !important;');
      noAceptado.setAttribute('style','display: none !important;');

      var idenAct = idens[c.value];
      var AsisAct = asis[c.value];
      var SincroAct = sincro[c.value];
      
      ipcRenderer.send('updateAsis', idenAct, AsisAct,SincroAct);

      setTimeout(function(){
      c.value = "";
      cedula.setAttribute('style','display: block !important; text-align:center;');
      verificado.setAttribute('style','display: none !important;');
      carga.setAttribute('style','display: none !important;');
      rechazado.setAttribute('style','display: none !important;');
      noAceptado.setAttribute('style','display: none !important;');},2000);

    }else if(c.value == ""){
      cedula.setAttribute('style','display: block !important; text-align:center;');
      verificado.setAttribute('style','display: none !important;');
      carga.setAttribute('style','display: none !important;');
      rechazado.setAttribute('style','display: none !important;');
      noAceptado.setAttribute('style','display: none !important;');
    }else if(c.value.length >=6 && c.value != idens[c.value]){
      rechazado.setAttribute('style','display: block !important; text-align:center;');
      verificado.setAttribute('style','display: none !important;');
      cedula.setAttribute('style','display: none !important;');
      carga.setAttribute('style','display: none !important;');
      noAceptado.setAttribute('style','display: none !important;');
    }else{
      carga.setAttribute('style','display: block !important; text-align:center;');
      verificado.setAttribute('style','display: none !important;');
      cedula.setAttribute('style','display: none !important;');
      rechazado.setAttribute('style','display: none !important;');
      noAceptado.setAttribute('style','display: none !important;');
    }

}