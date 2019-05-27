
  $.ajax({ 
    dataType: "json",
    url: './assets/departamentos.json', 
    success: function (data) { 
        var depar;
        depar += "<option value='-1'>Seleccione...</option>";
        for(let valor of data){
            depar += `<option value='${valor.nombre}'>${valor.nombre}</option>`;
            $('#sel_departamentos').html(depar);
        }
    }
});

$.ajax({ 
    dataType: "json",
    url: './assets/municipios.json', 
    success: function (data2) { 
        var ciud;
        ciud += "<option value='-1'>Seleccione...</option>";
        for(let valor2 of data2){
            ciud += `<option value='${valor2.nombre}'>${valor2.nombre}</option>`;
            $('#sel_ciudades').html(ciud);
        }
    }
});
