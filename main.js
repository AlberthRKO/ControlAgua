var customBadgeHTML = function (params) {
    var color = "";
    if (params.value == "Administrador") {
        color = "primary"
        return "<div class='badge badge-pill badge-light-" + color + "' >" + params.value + "</div>"
    } else if (params.value == "Secretaria") {
        color = "warning";
        return "<div class='badge badge-pill badge-light-" + color + "' >" + params.value + "</div>"
    } else if (params.value == "Secretario") {
        color = "warning";
        return "<div class='badge badge-pill badge-light-" + color + "' >" + params.value + "</div>"
    }
}

//  Rendering bullet in verified column
var customBulletHTML = function (params) {
    var color = "";
    if (params.value == true) {
        color = "success"
        return "<div class='bullet bullet-sm bullet-" + color + "' >" + "</div>"
    } else if (params.value == false) {
        color = "secondary";
        return "<div class='bullet bullet-sm bullet-" + color + "' >" + "</div>"
    }
}

// Renering Icons in Actions column
var customIconsHTML = function (params) {
    var usersIcons = document.createElement("span");
    var editIconHTML = "<a href='app-user-edit.html'><i class= 'users-edit-icon feather icon-edit-1 mr-50'></i></a>"
    var deleteIconHTML = document.createElement('i');
    var attr = document.createAttribute("class")
    attr.value = "users-delete-icon feather icon-trash-2"
    deleteIconHTML.setAttributeNode(attr);
    // selected row delete functionality
    deleteIconHTML.addEventListener("click", function () {
        deleteArr = [
            params.data
        ];
        // var selectedData = gridOptions.api.getSelectedRows();
        gridOptions.api.updateRowData({
            remove: deleteArr
        });
    });
    usersIcons.appendChild($.parseHTML(editIconHTML)[0]);
    usersIcons.appendChild(deleteIconHTML);
    return usersIcons
}

//  Rendering avatar in username column
var customAvatarHTML = function (params) {
    return "<span class='avatar'><img src='" + params.data.avatar + "' height='32' width='32'></span>" + params.value
}

// ag-grid
/*** COLUMN DEFINE ***/

var columnDefs = [{
    headerName: 'ID',
    field: 'id',
    width: 125,
    filter: true,
},
{
    headerName: 'Usuario',
    field: 'usuario',
    filter: true,
    width: 175
},
{
    headerName: 'Nombre',
    field: 'nombre',
    filter: true,
    width: 200,
},
{
    headerName: 'Apellido',
    field: 'apellido',
    filter: true,
    width: 200,
},
{
    headerName: 'Sexo',
    field: 'sexo',
    filter: true,
    width: 125
},
{
    headerName: 'Edad',
    field: 'edad',
    filter: true,
    width: 125
},
{
    headerName: 'Cargo',
    field: 'cargo',
    filter: true,
    width: 200,
    cellRenderer: customBadgeHTML,
    cellStyle: {
        "text-align": "center"
    }
},
{
    headerName: 'Departamento',
    field: 'departamento',
    filter: true,
    width: 200,
},
{
    headerName: 'Acciones',
    field: 'acciones',
    width: 125,
    cellRenderer: customIconsHTML,
    cellStyle: {
        "text-align": "center"
    }
}
];

// specify the data
var rowData = [
    {
        "id": 1,
        "usuario": "AlberthRKO",
        "nombre": "Alberto Orlando",
        "apellido": "Paredes Mamani",
        "sexo": "M",
        "edad": 23,
        "cargo": "Administrador",
        "departamento": "CAPYSH"
    },
    {
        "id": 2,
        "usuario": "Keith",
        "nombre": "Alberto Orlando",
        "apellido": "Paredes Mamani",
        "sexo": "M",
        "edad": 23,
        "cargo": "Administrador",
        "departamento": "CAPYSH"
    },
    {
        "id": 3,
        "usuario": "Lobo",
        "nombre": "Osvaldo",
        "apellido": "Garcia Rojas",
        "sexo": "M",
        "edad": 23,
        "cargo": "Secretario",
        "departamento": "CAPYSH"
    },
    {
        "id": 4,
        "usuario": "VitoZM",
        "nombre": "Alvaro Luis",
        "apellido": "Zapata Moscoso",
        "sexo": "M",
        "edad": 25,
        "cargo": "Administrador",
        "departamento": "CAPYSH"
    },
    {
        "id": 5,
        "usuario": "YSMar",
        "nombre": "Marlen",
        "apellido": "Yucra Seña",
        "sexo": "F",
        "edad": 22,
        "cargo": "Secretaria",
        "departamento": "CAPYSH"
    }
];

// let the grid know which columns and what data to use
var gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    rowSelection: "single",
    floatingFilter: true,
    filter: true,
    pagination: true,
    paginationPageSize: 20,
    animateRows: true,
    resizable: true
};




// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
});