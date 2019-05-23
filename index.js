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

  ipcMain.on("insert", (e, respuesta) => {
    // var knex = require("knex")({
    //   client: "sqlite3",
    //   connection: {
    //     filename: "./database.sqlite3"
    //   },
    //   useNullAsDefault: true
    // });

    // knex("suroeste").insert([{respuesta.lista}])
    //   .then(() => console.log(respuesta + " Insertado"))
    //   .catch(err => {
    //     console.log(err);
    //     throw err;
    //   })
    //   .finally(() => {
    //     knex.destroy();
    //   });

    console.log(respuesta.lista);

    // newWin.close();
    // mainWindow.reload();g
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

    knex("lorem")
      .where({
        id: infoE.toString()
      })
      .update({
        info: allE.info
      })
      .then(() => console.log(allE.info + " Actualizado"))
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
