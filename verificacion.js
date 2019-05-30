var cedula = document.getElementsByClassName('cedula')[0];
var carga = document.getElementsByClassName('carga')[0];
var verificado = document.getElementsByClassName('verificado')[0];
var rechazado = document.getElementsByClassName('rechazado')[0];

var knex = require("knex")({
    client: "sqlite3",
    connection: {
      filename: "./database.sqlite3"
    },
    useNullAsDefault: true
  });
  var idens = [];
  knex
  .from("suroeste")
  .select("*")
  .then(rows => {
    for (row of rows) {
        // console.log(row['identificacion'])
         idens[row['identificacion']] = row['identificacion'];
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
    if(c.value == idens[c.value] && c.value!= ""){
      verificado.setAttribute('style','display: block !important; text-align:center;');
      cedula.setAttribute('style','display: none !important;');
      carga.setAttribute('style','display: none !important;');
      rechazado.setAttribute('style','display: none !important;');
    }else if(c.value == ""){
      cedula.setAttribute('style','display: block !important; text-align:center;');
      verificado.setAttribute('style','display: none !important;');
      carga.setAttribute('style','display: none !important;');
      rechazado.setAttribute('style','display: none !important;');
    }else if(c.value.length >=7 && c.value != idens[c.value]){
      rechazado.setAttribute('style','display: block !important; text-align:center;');
      verificado.setAttribute('style','display: none !important;');
      cedula.setAttribute('style','display: none !important;');
      carga.setAttribute('style','display: none !important;');
    }else{
      carga.setAttribute('style','display: block !important; text-align:center;');
      verificado.setAttribute('style','display: none !important;');
      cedula.setAttribute('style','display: none !important;');
      rechazado.setAttribute('style','display: none !important;');
    }

}