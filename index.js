const {
  app,
  BrowserWindow,
  ipcMain
} = require("electron");
const path = require("path");
const url = require("url");


var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./database.sqlite3"
  },
  useNullAsDefault: true
});

app.on("ready", () => {
  let mainWindow = new BrowserWindow({
    height: 1080,
    width: 1920,
    show: false,
    webPreferences: {
      nodeIntegration: true
    },
    icon: __dirname + "/favicon.ico"
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  ipcMain.on("insert", async (e, lista, contPag) => {

    var knex = require("knex")({
      client: "sqlite3",
      connection: {
        filename: "./database.sqlite3"
      },
      useNullAsDefault: true
    });

    let cantidad = Math.ceil(lista.length / 70);
    let data = [];
    for(dato of lista){
        if(dato.identificacion == null){dato.identificacion = ""}
        if(dato.gen == null){dato.gen = ""}
        if(dato.estado == null){dato.estado = ""}
        if(dato.tipo_iden == null){dato.tipo_iden = ""}
        if(dato.nombre1 == null){dato.nombre1 = ""}
        if(dato.nombre2 == null){dato.nombre2 = ""}
        if(dato.apellido1 == null){dato.apellido1 = ""}
        if(dato.apellido2 == null){dato.apellido2 = ""}
        if(dato.correo == null){dato.correo = ""}
        if(dato.celular == null){dato.celular = ""}
        if(dato.ciudad == null){dato.ciudad = ""}
        if(dato.departamento == null){dato.departamento = ""}
        if(dato.empresa == null){dato.empresa = ""}
        if(dato.cargo == null){dato.cargo = ""}
        if(dato.sector == null){dato.sector = ""}
        if(dato.__v == null){dato.__v = ""}
        if(dato.asistencia == null){dato.asistencia = false}
        if(dato.sincronizar == null){dato.sincronizar = false}
      data.push({
        id_Mongo: dato._id,
        gen: dato.gen,
        estado: dato.estado,
        tipo_iden: dato.tipo_iden,
        identificacion: dato.identificacion,
        nombre1: dato.nombre1,
        nombre2: dato.nombre2,
        apellido1: dato.apellido1,
        apellido2: dato.apellido2,
        correo: dato.correo,
        celular: dato.celular,
        ciudad: dato.ciudad.nombre_ciudad,
        departamento: dato.departamento,
        empresa: dato.empresa,
        cargo: dato.cargo,
        sector: dato.sector,
        __v: dato.__v,
        asistencia: false,
        sincronizar: false
      })

      
  }

    // function comparar(datos){
    //   // console.log(lista);
    //   knex("suroeste")
    //   .where({id_Mongo: datos._id})
    //   .then(rows =>{
    //     for(row of rows){
    //       console.log(row["id_Mongo"]);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     throw err;
    //   })
    //   return false;
    // }

    let datos = [];
    for (let i = 0; i < 70; i++) {
      datos.push(data.slice(i * cantidad, (i + 1) * cantidad));
    }

    for (let f = 0 ; f < datos.length; f++) {
        await knex("suroeste")
      .insert(datos[f])
      .catch(e =>{
        console.log(e);
      });
      console.log("Insertado")
    }
    knex.destroy();

    mainWindow.reload();
  });

  ipcMain.on("deleteAll", e => {
    var knex = require("knex")({
      client: "sqlite3",
      connection: {
        filename: "./database.sqlite3"
      },
      useNullAsDefault: true
    });

    knex("suroeste")
      .truncate()
      .then(() => console.log("Todos Eliminados"))
      .catch(err => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });

    mainWindow.reload();
  });

  ipcMain.on("delete", (e, infoD, Mongo) => {
    var knex = require("knex")({
      client: "sqlite3",
      connection: {
        filename: "./database.sqlite3"
      },
      useNullAsDefault: true
    });

    knex("suroeste")
      .where({
        _id: infoD
      })
      .del()
      .then(() => 
        knex("eliminados")
        .insert({
          id_Mongo: Mongo
        })
        .then(() => console.log(" Eliminado e insertado en la tabla de eliminados")))
      .catch(err => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });

    mainWindow.reload();
  });

  ipcMain.on("update", (e, allE, infoE) => {
    console.log(infoE.toString());

    var knex = require("knex")({
      client: "sqlite3",
      connection: {
        filename: "./database.sqlite3"
      },
      useNullAsDefault: true
    });

    knex("suroeste")
      .where({
        _id: infoE.toString()
      })
      .update({
        nombre1: allE.nombre1,
        nombre2: allE.nombre2,
        apellido1: allE.apellido1,
        apellido2: allE.apellido2,
        tipo_iden: allE.tipo_iden,
        identificacion: allE.identificacion,
        celular: allE.celular,
        empresa: allE.empresa,
        cargo: allE.cargo,
        departamento: allE.departamento,
        ciudad: allE.ciudad,
        sector: allE.sector,
        correo: allE.correo,
        sincronizar: true
      })
      .then(() => console.log(" Actualizado"))
      .catch(err => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
    mainWindow.reload();
  });

  ipcMain.on("insertN", (e, allI) => {

    var knex = require("knex")({
      client: "sqlite3",
      connection: {
        filename: "./database.sqlite3"
      },
      useNullAsDefault: true
    });

    knex("suroeste")
      .insert({
        gen: true,
        estado: true,
        nombre1: allI.nombre1,
        nombre2: allI.nombre2,
        apellido1: allI.apellido1,
        apellido2: allI.apellido2,
        tipo_iden: allI.tipo_iden,
        identificacion: allI.identificacion,
        celular: allI.celular,
        empresa: allI.empresa,
        cargo: allI.cargo,
        departamento: allI.departamento,
        ciudad: allI.ciudad,
        sector: allI.sector,
        correo: allI.correo,
        __v: "0",
        asistencia: true,
        sincronizar: true
      })
      .then(() => console.log(" Insertado Correctamente"))
      .catch(err => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
    mainWindow.reload();
  });

  ipcMain.on("updateAsis", (e, idenAct, AsisAct, SincroAct) => {

    var knex = require("knex")({
      client: "sqlite3",
      connection: {
        filename: "./database.sqlite3"
      },
      useNullAsDefault: true
    });

    knex("suroeste")
      .where({
        identificacion: idenAct
      })
      .update({
        asistencia: true,
        sincronizar: true
      })
      .then(() => console.log("Asistencia Actualizada"))
      .catch(err => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  });


});

app.on("window-all-closed", () => {
  app.quit();
});

let newWin;

function openWindow() {
  newWin = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    }
  });
  newWin.loadURL(
    url.format({
      pathname: path.join(__dirname, "insert.html"),
      protocol: "file",
      slashes: true
    })
  );
}

ipcMain.on("insertNew", e => {
  openWindow();
});

// let win

// function createWindow () {

//   win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true
//     }
//   })

//   win.loadFile('index.html')

//   let server = require('./server/server.js')

//   win.webContents.openDevTools()

//   win.on('closed', () => {

//     win = null
//   })
// }

// app.on('ready', createWindow)

// app.on('window-all-closed', () => {

//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', () => {

//   if (win === null) {
//     createWindow()
//   }
// })





// knex("suroeste")
//       .insert([
//         {
//           info: all.info
//         }
//       ])
//       .then(() => console.log(all.info + " Insertado"))
//       .catch(err => {
//         console.log(err);
//         throw err;
//       })
//       .finally(() => {
//         knex.destroy();
//       });