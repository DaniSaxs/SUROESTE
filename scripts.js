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

knex
  .from("suroeste")
  .select("*")
  .then(rows => {
    for (row of rows) {
      let cont = `<tr>
            <td>${row["identificacion"]}</td>
            <td class='card-title'>${row["nombre1"] +
              " " +
              row["apellido1"]}</td>
              <td class='card-title'>${row["celular"]}</td>
            <td><button class='btn btn-info' onclick='actualizar(this,${
              row["_id"]
            })' nombre1='${row["nombre1"]}' nombre2='${row["nombre2"]}' apellido='${row["apellido1"]}' apellido2='${row["apellido2"]}' tipoI='${row["tipo_iden"]}' iden='${row["identificacion"]}' cel='${row["celular"]}' empresa='${row["empresa"]}' cargo='${row["cargo"]}' departamento='${row["departamento"]}' ciudad='${row["ciudad"]}' sector='${row["sector"]}' correo='${row["correo"]}' id = 'botonAct' data-toggle='modal' data-target='#exampleModalCenter'>Editar</button>
            <button class='btn btn-danger' onclick='actualizar(this,${
              row["_id"]
            })' texto='${row["nombre1"]}' id = 'botonAct'>Ver Info</button></td>
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
  

// function Insertar() {
//   ipcRenderer.send('insertNew');
// }

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

// function eliminar(infoD) {
//   //-----------------------Sweet Alert-----------------//
//   Swal.fire({
//     title: '¿Estás seguro?',
//     text: "No podrás revertir esta acción",
//     type: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#d33',
//     cancelButtonColor: '#3085d6',
//     confirmButtonText: 'Sí, Eliminar!',
//     cancelButtonText: 'Cancelar!'
//   }).then((result) => {
//     if (result.value) {
//       ipcRenderer.send('delete', infoD);
//     }
//   })
//   //----------------------------------------------------//
// }

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

    e.preventDefault();

  });

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
