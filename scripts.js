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
              row["id"]
            })' texto='${row["nombre1"]}' id = 'botonAct' data-toggle='modal' data-target='#exampleModalCenter'>Editar</button>
            <button class='btn btn-danger' onclick='actualizar(this,${
              row["id"]
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
  console.log(infoE.toString())
  //------------------------update-----------------------//
  const {
    ipcRenderer
  } = require('electron')
  const botonAct = elemento;
  const texto = botonAct.getAttribute('texto');
  console.log(texto);
  const nameText = document.getElementById('nombre');
  nameText.setAttribute('value', texto);

  const form = document.querySelector('form');
  form.addEventListener('submit', e => {

    const name = document.querySelector('#nombre').value;
    console.log(name);

    const allE = {
      info: nombre1
    };
    //-----------------------Sweet Alert-----------------//
    let timerInterval
    Swal.fire({
      title: 'Editar',
      html: 'Actualizando ' + allE.info,
      timer: 1000,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          Swal.getContent().querySelector('strong')
            .textContent = Swal.getTimerLeft()
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
