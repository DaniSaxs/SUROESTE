


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
    $('#sel_departamentos').change(function(){
        let depto = $('#sel_departamentos').val();
    if(depto != '-1'){$.ajax({ 
        dataType: "json",
        url: './assets/'+depto+'.json', 
        success: function (data2) { 
            var ciud;
            ciud += "<option value='-1'>Seleccione...</option>";
            for(let valor2 of data2){
                ciud += `<option value='${valor2.nombre}'>${valor2.nombre}</option>`;
                $('#sel_ciudades').html(ciud);
            }
        }
    });
    
    }
});

$.ajax({ 
    dataType: "json",
    url: './assets/departamentos.json', 
    success: function (data) { 
        var depar;
        depar += "<option value='-1'>Seleccione...</option>";
        for(let valor of data){
            depar += `<option value='${valor.nombre}'>${valor.nombre}</option>`;
            $('#sel_departamentosA').html(depar);
        }

    }
});
$('#sel_departamentosA').change(function(){
    let depto = $('#sel_departamentosA').val();
if(depto != '-1'){$.ajax({ 
    dataType: "json",
    url: './assets/'+depto+'.json', 
    success: function (data2) { 
        var ciud;
        ciud += "<option value='-1'>Seleccione...</option>";
        for(let valor2 of data2){
            ciud += `<option value='${valor2.nombre}'>${valor2.nombre}</option>`;
            $('#sel_ciudadesA').html(ciud);
        }
    }
});

}
});


