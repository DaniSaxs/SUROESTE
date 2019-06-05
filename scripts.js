const { ipcRenderer } = require("electron");
require("./js/sweetalert2@8");

var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./database.sqlite3"
  },
  useNullAsDefault: true
});

ipcRenderer.on("insert", (e, all) => {
  console.log(all);
});

let seleccion = document.getElementById("result");

/* ================ Buscar ============================== */
var inputCiu = document.querySelector('#bCiu')
var inputNom = document.querySelector('#bNom')
var inputCed = document.querySelector('#bCed')
function ce(c){
  if(c.value == ""){
    
    inputCiu.removeAttribute('disabled');
    inputNom.removeAttribute('disabled');

  }else{
   
    var atributo = document.createAttribute('disabled');
    var atributo2 = document.createAttribute('disabled');

    inputCiu.setAttributeNode(atributo);
    inputNom.setAttributeNode(atributo2);
  }
}

function no(c){
  if(c.value == ""){
    inputCiu.removeAttribute('disabled');
    inputCed.removeAttribute('disabled');

  }else{
    var atributo = document.createAttribute('disabled');
    var atributo2 = document.createAttribute('disabled');
    
    inputCiu.setAttributeNode(atributo);
    inputCed.setAttributeNode(atributo2);
  }
}
function ci(c){
  if(c.value == ""){
    inputNom.removeAttribute('disabled');
    inputCed.removeAttribute('disabled');
  }else{
    var atributo = document.createAttribute('disabled');
    var atributo2 = document.createAttribute('disabled');

    inputCed.setAttributeNode(atributo);
    inputNom.setAttributeNode(atributo2);
  }
}

var contPagone = document.getElementsByClassName("pagination")[0];

function buscar(form) {
  // console.log('buscar');
  // console.log(form);
  let inpCedula = form.bCed;
  let inpNombre = form.bNom;
  let inpCiudad = form.bCiu;
  
  
  
  var idTipo = "";
  var valor = "";

  if(inpCedula.value != ""){
    idTipo = "identificacion";
    valor = (inpCedula.value).toUpperCase();
  }else if(inpNombre.value != ""){
    idTipo= "nombre1";
    valor = (inpNombre.value).toUpperCase();
  }
  else if(inpCiudad.value != ""){
    idTipo= "ciudad";
    valor = (inpCiudad.value).toUpperCase();
  }

  seleccion.innerHTML = "";
  var knex = require("knex")({
    client: "sqlite3",
    connection: {
      filename: "./database.sqlite3"
    },
    useNullAsDefault: true
  });

  knex
  .from("suroeste")
  .select("*").where(idTipo,valor)
  .then(rows => {
    for (row of rows) {

      let cont = `<tr>
            <td>${row["identificacion"]}</td>
            <td class='card-title'>${row["nombre1"] + " " + row["nombre2"] + " " + row["apellido1"] + " " + row["apellido2"]}</td>
              <td class='card-title'>${row["ciudad"]}</td>
            <td><button class='btn btn-primary' onclick='actualizar(this,${
              row["_id"]
            })' nombre1='${row["nombre1"]}' nombre2='${row["nombre2"]}' apellido='${row["apellido1"]}' apellido2='${row["apellido2"]}' tipoI='${row["tipo_iden"]}' iden='${row["identificacion"]}' cel='${row["celular"]}' empresa='${row["empresa"]}' cargo='${row["cargo"]}' departamento='${row["departamento"]}' ciudad='${row["ciudad"]}' sector='${row["sector"]}' correo='${row["correo"]}' id = 'botonAct' data-toggle='modal' data-target='#exampleModalCenter'>Editar</button>
            <button class='btn btn-info' onclick='ver(this,${
              row["_id"]
            })' nombre1='${row["nombre1"]}' nombre2='${row["nombre2"]}' apellido='${row["apellido1"]}' apellido2='${row["apellido2"]}' tipoI='${row["tipo_iden"]}' iden='${row["identificacion"]}' cel='${row["celular"]}' empresa='${row["empresa"]}' cargo='${row["cargo"]}' departamento='${row["departamento"]}' ciudad='${row["ciudad"]}' sector='${row["sector"]}' correo='${row["correo"]}' asistencia='${row["asistencia"]}' id = 'botonAct' data-toggle='modal' data-target='#exampleModalCenter2'>Ver Info</button>
            <button class='btn btn-danger' onclick='eliminar("${row['_id']}","${row['id_Mongo']}")'>Eliminar</button></td>
        </tr>`;
      seleccion.innerHTML += cont;
    }
  })
  .catch(err => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
  inpCedula.value= "";
  inpCiudad.value = "";
  inpNombre.value="";
  inputCiu.removeAttribute('disabled');
  inputNom.removeAttribute('disabled');
  inputCed.removeAttribute('disabled');
  contPagone.style.display = "none";
  return false
}

function pagination(elemento1){
  const elementsPagination = document.getElementsByClassName("page-item");
  for(let i = 0; i<elementsPagination.length; i++){
    elementsPagination[i].setAttribute("class","page-item");
  }

  elemento1.setAttribute("class","page-item active");
}

var paginacion = 0;


function cargar(number) {
  inputCiu.removeAttribute('disabled');
  inputNom.removeAttribute('disabled');
  inputCed.removeAttribute('disabled');
  inputCiu.value = "";
  inputNom.value = "";
  inputCed.value = "";
  // if(idTipo == ""){
  //   idTipo = "__v";
  //   valor = "0"
  // }
  //element.setAttribute("class","page-link");
  contPagone.style.display = "flex";

  
  seleccion.innerHTML = "";
  var knex = require("knex")({
    client: "sqlite3",
    connection: {
      filename: "./database.sqlite3"
    },
    useNullAsDefault: true
  });
  
  paginacion = number;
  
  knex
  .from("suroeste")
  .select("*").limit(50).offset(paginacion)
  .then(rows => {
    for (row of rows) {

      let cont = `<tr>
            <td>${row["identificacion"]}</td>
            <td class='card-title'>${row["nombre1"] + " " + row["nombre2"] + " " + row["apellido1"] + " " + row["apellido2"]}</td>
              <td class='card-title'>${row["ciudad"]}</td>
            <td><button class='btn btn-primary' onclick='actualizar(this,${
              row["_id"]
            })' nombre1='${row["nombre1"]}' nombre2='${row["nombre2"]}' apellido='${row["apellido1"]}' apellido2='${row["apellido2"]}' tipoI='${row["tipo_iden"]}' iden='${row["identificacion"]}' cel='${row["celular"]}' empresa='${row["empresa"]}' cargo='${row["cargo"]}' departamento='${row["departamento"]}' ciudad='${row["ciudad"]}' sector='${row["sector"]}' correo='${row["correo"]}' id = 'botonAct' data-toggle='modal' data-target='#exampleModalCenter'>Editar</button>
            <button class='btn btn-info' onclick='ver(this,${
              row["_id"]
            })' nombre1='${row["nombre1"]}' nombre2='${row["nombre2"]}' apellido='${row["apellido1"]}' apellido2='${row["apellido2"]}' tipoI='${row["tipo_iden"]}' iden='${row["identificacion"]}' cel='${row["celular"]}' empresa='${row["empresa"]}' cargo='${row["cargo"]}' departamento='${row["departamento"]}' ciudad='${row["ciudad"]}' sector='${row["sector"]}' correo='${row["correo"]}' asistencia='${row["asistencia"]}' id = 'botonAct' data-toggle='modal' data-target='#exampleModalCenter2'>Ver Info</button>
            <button class='btn btn-danger' onclick='eliminar("${row['_id']}","${row['id_Mongo']}")'>Eliminar</button></td>
        </tr>`;
      seleccion.innerHTML += cont;
    }
  })
  .catch(err => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });

  // if (idTipo!="") {
  //   return false
  // }else{

  // }
  
}

cargar("")
buscar()



function Insertar() {

   // -------------------------Seleccion-------------------------

    var knex = require("knex")({
      client: "sqlite3",
      connection: {
        filename: "./database.sqlite3"
      },
      useNullAsDefault: true
    });

    var idens2 = [];

    knex
    .from("suroeste")
    .select("*")
    .then(rows => {
      for (row of rows) {

          idens2[row['identificacion']] = row['identificacion'];
      }
    })
    .catch(err => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      knex.destroy();
    });

   // -------------------------Seleccion-------------------------

  const form3 = document.querySelector('#formIns');
  form3.addEventListener('submit', e => {

    const {
      ipcRenderer
    } = require('electron')
  
    const name1I = document.querySelector('#nombreA').value;
    const name2I = document.querySelector('#nombre2A').value;
    const apell1I = document.querySelector('#apellidoA').value;
    const apell2I = document.querySelector('#apellido2A').value;
    const tipoidenI = document.querySelector('#sel_tipo_idA').value;
    const idntI = document.querySelector('#identificacionA').value;
    const cellI = document.querySelector('#celularA').value;
    const emprI = document.querySelector('#empresaA').value;
    const carI = document.querySelector('#cargoA').value;
    const deparI = document.querySelector('#sel_departamentosA').value;
    const ciuI = document.querySelector('#sel_ciudadesA').value;
    const sectI = document.querySelector('#sectorA').value;
    const corrI = document.querySelector('#correoA').value;

    const allI = {
      nombre1: name1I,
      nombre2: name2I,
      apellido1: apell1I,
      apellido2: apell2I,
      tipo_iden: tipoidenI,
      identificacion: idntI,
      celular: cellI,
      empresa: emprI,
      cargo: carI,
      departamento: deparI,
      ciudad: ciuI,
      sector: sectI,
      correo: corrI
    };

    if(idntI == idens2[idntI]){
        
        Swal.fire(
          'Atención',
          'Esta cédula ya está registrada',
          'warning'
        )
      }

        if(ciuI == "" || ciuI == "-1"){
        
          Swal.fire(
            'Atención',
            'Debes seleccionar una ciudad',
            'warning'
          )
      }

      if(idntI != idens2[idntI] && ciuI != "" && ciuI != "-1"){
    //-----------------------Sweet Alert-----------------//
    let timerInterval
    Swal.fire({
      title: 'Insertar Nuevo',
      html: 'Insertando...',
      timer: 1000,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          Swal.getContent().querySelector('strong')
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
        ipcRenderer.send('insertN', allI);
      }
    }).then((result) => {
      if (
        result.dismiss === Swal.DismissReason.timer
      ) {

      }
    })
    //------------------------------------------//
  }

    e.preventDefault();
  });
}

// function EliminarTodos() {
//   //-----------------------Sweet Alert-----------------//
//   Swal.fire({
//     title: '¿Estás seguro?',
//     text: "No podrás revertir esta acción",
//     type: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#d33',
//     cancelButtonColor: '#3085d6',
//     confirmButtonText: 'Sí, Eliminar Todos!',
//     cancelButtonText: 'Cancelar!'
//   }).then((result) => {
//     if (result.value) {
//       ipcRenderer.send('deleteAll');
//     }
//   })
//   //----------------------------------------------------//
// }

function eliminar(infoD,Mongo) {
  //-----------------------Sweet Alert-----------------//
  Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esta acción",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, Eliminar!',
    cancelButtonText: 'Cancelar!'
  }).then((result) => {
    if (result.value) {
      ipcRenderer.send('delete', infoD, Mongo);
    }
  })
  //----------------------------------------------------//
}

function actualizar(elemento, infoE) {
  //------------------------update-----------------------//
  const {
    ipcRenderer
  } = require('electron')
  const botonAct = elemento;
  const nombre1 = botonAct.getAttribute('nombre1');
  const nombre2 = botonAct.getAttribute('nombre2');
  const nameText = document.getElementById('nombre');
  const nameText2 = document.getElementById('nombre2');
  const ape = botonAct.getAttribute('apellido');
  const ape2 = botonAct.getAttribute('apellido2');
  const apellido = document.getElementById('apellido');
  const apellido2 = document.getElementById('apellido2');
  nameText.setAttribute('value', nombre1);
  nameText2.setAttribute('value', nombre2);
  apellido.setAttribute('value', ape);
  apellido2.setAttribute('value', ape2);
  const tipoI = botonAct.getAttribute('tipoI');
  const tipo = document.getElementById('sel_tipo_id');
  tipo.setAttribute('value',tipoI);
  const tipF = tipo.getAttribute('value');
  const a = document.createAttribute('selected');
  const a2 = document.createAttribute('selected');
  if(tipF == "CE"){
    const CEa = document.getElementById('CE');
    a.value = "selected";
    CEa.setAttributeNode(a);
  }
  if(tipF == "CC"){
    const CCa = document.getElementById('CC');
    a.value = "selected";
    CCa.setAttributeNode(a);
  }
  if(tipF == "NIT"){
    const NITa = document.getElementById('NIT');
    a.value = "selected";
    NITa.setAttributeNode(a);
  }
  const iden = botonAct.getAttribute('iden');
  const cedula = document.getElementById('identificacion');
  cedula.setAttribute('value',iden);
  const cel = botonAct.getAttribute('cel');
  const celu = document.getElementById('celular');
  celu.setAttribute('value',cel);
  const empresa = botonAct.getAttribute('empresa');
  const empre = document.getElementById('empresa');
  empre.setAttribute('value',empresa);
  const cargo = botonAct.getAttribute('cargo');
  const carg = document.getElementById('cargo');
  carg.setAttribute('value', cargo);
  const dept = botonAct.getAttribute('departamento');
  const dept2 = document.getElementById('sel_departamentos');
  dept2.setAttribute('value', dept);
  const city = botonAct.getAttribute('ciudad');
  const city2 = document.getElementById('sel_ciudades');
  city2.setAttribute('value', city);
  const sector = botonAct.getAttribute('sector');
  const sec = document.getElementById('sector');
  sec.setAttribute('value', sector);
  const secF = sec.getAttribute('value');
  if(secF == "Gubernamental"){
    const inst = document.getElementById('gubernamental');
    a2.value = "selected";
    inst.setAttributeNode(a2);
  }
  if(secF == "Institucional"){
    const inst = document.getElementById('institucional');
    a2.value = "selected";
    inst.setAttributeNode(a2);
  }
  if(secF == "Empresarial"){
    const inst = document.getElementById('empresarial');
    a2.value = "selected";
    inst.setAttributeNode(a2);
  }
  if(secF == "Social"){
    const inst = document.getElementById('social');
    a2.value = "selected";
    inst.setAttributeNode(a2);
  }
  if(secF == "General"){
    const inst = document.getElementById('general');
    a2.value = "selected";
    inst.setAttributeNode(a2);
  }
  
  const correo = botonAct.getAttribute('correo');
  const corre = document.getElementById('correo');
  corre.setAttribute('value', correo);

  const form2 = document.querySelector('#formUpd');
  form2.addEventListener('submit', e => {

    const name1 = document.querySelector('#nombre').value;
    const name2 = document.querySelector('#nombre2').value;
    const apell1 = document.querySelector('#apellido').value;
    const apell2 = document.querySelector('#apellido2').value;
    const tipoiden = document.querySelector('#sel_tipo_id').value;
    const idnt = document.querySelector('#identificacion').value;
    const cell = document.querySelector('#celular').value;
    const empr = document.querySelector('#empresa').value;
    const car = document.querySelector('#cargo').value;
    const depar = document.querySelector('#sel_departamentos').value;
    const ciu = document.querySelector('#sel_ciudades').value;
    const sect = document.querySelector('#sector').value;
    const corr = document.querySelector('#correo').value;

    const allE = {
      nombre1: name1,
      nombre2: name2,
      apellido1: apell1,
      apellido2: apell2,
      tipo_iden: tipoiden,
      identificacion: idnt,
      celular: cell,
      empresa: empr,
      cargo: car,
      departamento: depar,
      ciudad: ciu,
      sector: sect,
      correo: corr
    };

    if(ciu == "" || ciu == "-1"){
        
      Swal.fire(
        'Atención',
        'Debes seleccionar una ciudad',
        'warning'
      )
  }else{
    //-----------------------Sweet Alert-----------------//
    let timerInterval
    Swal.fire({
      title: 'Editar',
      html: 'Actualizando',
      timer: 1000,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          Swal.getContent().querySelector('strong')
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
        ipcRenderer.send('update', allE, infoE);
      }
    }).then((result) => {
      if (
        result.dismiss === Swal.DismissReason.timer
      ) {

      }
    })
    //------------------------------------------//
  }

    e.preventDefault();

  });

}



function ver(elemento, infoE) {
  //------------------------update-----------------------//
  const botonAct = elemento;
  const nombre1 = botonAct.getAttribute('nombre1');
  const nombre2 = botonAct.getAttribute('nombre2');
  const nameText = document.getElementById('nombreI');
  const nameText2 = document.getElementById('nombre2I');
  const ape = botonAct.getAttribute('apellido');
  const ape2 = botonAct.getAttribute('apellido2');
  const apellido = document.getElementById('apellidoI');
  const apellido2 = document.getElementById('apellido2I');
  nameText.setAttribute('value', nombre1);
  nameText2.setAttribute('value', nombre2);
  apellido.setAttribute('value', ape);
  apellido2.setAttribute('value', ape2);
  const tipoI = botonAct.getAttribute('tipoI');
  const tipo = document.getElementById('sel_tipo_idI');
  tipo.setAttribute('value',tipoI);
  const tipF = tipo.getAttribute('value');
  const iden = botonAct.getAttribute('iden');
  const cedula = document.getElementById('identificacionI');
  cedula.setAttribute('value',iden);
  const cel = botonAct.getAttribute('cel');
  const celu = document.getElementById('celularI');
  celu.setAttribute('value',cel);
  const empresa = botonAct.getAttribute('empresa');
  const empre = document.getElementById('empresaI');
  empre.setAttribute('value',empresa);
  const cargo = botonAct.getAttribute('cargo');
  const carg = document.getElementById('cargoI');
  carg.setAttribute('value', cargo);
  const dept = botonAct.getAttribute('departamento');
  const dept2 = document.getElementById('sel_departamentosI');
  dept2.setAttribute('value', dept);
  if(dept2.value == "05"){
    dept2.value = "ANTIOQUIA";
  }
  if(dept2.value == "08"){
    dept2.value = "ATLÁNTICO";
  }
  if(dept2.value == "11"){
    dept2.value = "BOGOTÁ";
  }
  if(dept2.value == "13"){
    dept2.value = "BOLÍVAR";
  }
  if(dept2.value == "15"){
    dept2.value = "BOYACÁ";
  }
  if(dept2.value == "17"){
    dept2.value = "CALDAS";
  }
  if(dept2.value == "18"){
    dept2.value = "CAQUETÁ";
  }
  if(dept2.value == "19"){
    dept2.value = "CAUCA";
  }
  if(dept2.value == "20"){
    dept2.value = "CESAR";
  }
  if(dept2.value == "23"){
    dept2.value = "CÓRDOBA";
  }
  if(dept2.value == "25"){
    dept2.value = "CUNDINAMARCA";
  }
  if(dept2.value == "27"){
    dept2.value = "CHOCÓ";
  }
  if(dept2.value == "41"){
    dept2.value = "HUILA";
  }
  if(dept2.value == "44"){
    dept2.value = "LA_GUAJIRA";
  }
  if(dept2.value == "47"){
    dept2.value = "MAGDALENA";
  }
  if(dept2.value == "50"){
    dept2.value = "META";
  }
  if(dept2.value == "52"){
    dept2.value = "NARIÑO";
  }
  if(dept2.value == "54"){
    dept2.value = "NORTE_DE_SANTANDER";
  }
  if(dept2.value == "63"){
    dept2.value = "QUINDÍO";
  }
  if(dept2.value == "66"){
    dept2.value = "RISARALDA";
  }
  if(dept2.value == "68"){
    dept2.value = "SANTANDER";
  }
  if(dept2.value == "70"){
    dept2.value = "SUCRE";
  }
  if(dept2.value == "73"){
    dept2.value = "TOLIMA";
  }
  if(dept2.value == "76"){
    dept2.value = "VALLE_DEL_CAUCA";
  }
  if(dept2.value == "81"){
    dept2.value = "ARAUCA";
  }
  if(dept2.value == "85"){
    dept2.value = "CASANARE";
  }
  if(dept2.value == "86"){
    dept2.value = "PUTUMAYO";
  }
  if(dept2.value == "88"){
    dept2.value = "SAN_ANDRÉS_Y_PROVIDENCIA";
  }
  if(dept2.value == "91"){
    dept2.value = "AMAZONAS";
  }
  if(dept2.value == "94"){
    dept2.value = "GUAINÍA";
  }
  if(dept2.value == "95"){
    dept2.value = "GUAVIARE";
  }
  if(dept2.value == "97"){
    dept2.value = "VAUPÉS";
  }
  if(dept2.value == "99"){
    dept2.value = "VICHADA";
  }
  const city = botonAct.getAttribute('ciudad');
  const city2 = document.getElementById('sel_ciudadesI');
  city2.setAttribute('value', city);
  const sector = botonAct.getAttribute('sector');
  const sec = document.getElementById('sectorI');
  sec.setAttribute('value', sector);
  const correo = botonAct.getAttribute('correo');
  const corre = document.getElementById('correoI');
  corre.setAttribute('value', correo);
  const asis = botonAct.getAttribute('asistencia');
  const asisI = document.getElementById('asis');
  asisI.setAttribute('value', asis);
  if(asisI.value == "1"){
    asisI.style.backgroundColor = "rgb(28, 221, 70)";
  }else{
    asisI.style.backgroundColor = "rgb(221, 28, 28)";
    asisI.style.color = "white";
  }
}

//---------------------------------knex---------------------------

// const electron = require("electron");
// const ipc = electron.ipcRenderer;
//     document.addEventListener("DOMContentLoaded", function(){
//      ipc.send("mainWindowLoaded")
//      ipc.on("resultSent", function(evt, result){
//         let resultEl = document.getElementById('result');
//             console.log(result);
//             for(var i=0; i< result.length; i++){
//                 resultEl.innerHTML += "<div class='alert alert-primary' role='alert' style='text-align:center'>First Name: " +result[i].info.toString() + "</div><br/>";
//             }
//         });
//     });

// let seleccion = document.getElementById('result');

// knex.from('lorem').select("*")
//     .then((rows) => {
//         for (row of rows) {
//             seleccion.innerHTML +=
//           "<div class='card text-center'>"+
//           "<div class='card-body'>"+
//             "<h5 class='card-title'>"+`${row['info']}`+"</h5>"+
//             "<button class='btn btn-danger' onclick='eliminar()'>Eliminar</button>"+
//           "</div>"+
//         "</div>"
//         }
//     }).catch((err) => { console.log( err); throw err })
//     .finally(() => {
//         knex.destroy();
//     });
