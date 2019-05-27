const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");

var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./database.sqlite3"
  },
  useNullAsDefault: true
});

// let newWinEdit
// function openWindowEdit(){
//    newWinEdit = new BrowserWindow({width: 400, height: 400,
//       webPreferences:{
//           nodeIntegration: true,
//       }})
//   newWinEdit.loadURL(url.format({
//       pathname: path.join(__dirname, 'editar.html'),
//       protocol: 'file',
//       slashes: true
//   }))
// }

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

  ipcMain.on("insert", (e, lista) => {

    for(let i=0; i < lista.length; i++){

      var knex = require("knex")({
        client: "sqlite3",
        connection: {
          filename: "./database.sqlite3"
        },
        useNullAsDefault: true
      });

    knex("suroeste").insert([{
      gen: lista[i].gen,
      estado: lista[i].estado,
      tipo_iden: lista[i].tipo_iden,
      identificacion: lista[i].identificacion,
      nombre1: lista[i].nombre1,
      nombre2: lista[i].nombre2,
      apellido1: lista[i].apellido1,
      apellido2: lista[i].apellido2,
      correo: lista[i].correo,
      celular: lista[i].celular,
      ciudad: lista[i].ciudad.nombre_ciudad,
      departamento: lista[i].departamento,
      empresa: lista[i].empresa,
      cargo: lista[i].cargo,
      sector: lista[i].sector,
      __v: lista[i].__v
    }])
      .then(() => console.log("Insertado"))
      .catch(err => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });

    }
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

    knex("lorem")
      .del()
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

  ipcMain.on("delete", (e, infoD) => {
    var knex = require("knex")({
      client: "sqlite3",
      connection: {
        filename: "./database.sqlite3"
      },
      useNullAsDefault: true
    });

    knex("lorem")
      .where({
        id: infoD.toString()
      })
      .del()
      .then(() => console.log("Eliminado Exitosamente"))
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
        correo: allE.correo
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
