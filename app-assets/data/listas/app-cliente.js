
$(document).ready(function () {

    var isRtl;
    if ($('html').attr('data-textdirection') == 'rtl') {
        isRtl = true;
    } else {
        isRtl = false;
    }

    //  Rendering badge in status column
    var customBadgeHTML = function (params) {
        var color = "";
        if (params.value == "En Servicio") {
            color = "primary"
            return "<div class='badge badge-pill badge-light-" + color + "' >" + params.value + "</div>"
        } else if (params.value == "Suspendido") {
            color = "warning";
            return "<div class='badge badge-pill badge-light-" + color + "' >" + params.value + "</div>"
        } else if (params.value == "Dado de Baja") {
            color = "danger";
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
        usersIcons.id = "eliminarRegistro";
        var editIconHTML = "<a href='#' data-toggle='modal' data-target='#editarCliente'><i class= 'users-edit-icon text-primary feather icon-edit-1 mr-50'></i></a>"
        var deleteIconHTML = "<a href='#' data-toggle='modal' data-target='#eliminarCliente'><i class= 'users-delete-icon text-danger feather icon-trash-2'></i></a>"

        usersIcons.appendChild($.parseHTML(editIconHTML)[0]);
        usersIcons.appendChild($.parseHTML(deleteIconHTML)[0]);
        return usersIcons
    }


    // ag-grid
    /*** COLUMN DEFINE ***/

    var columnDefs = [
        {
            headerName: 'N° Cliente',
            field: 'nCliente',
            filter: true,
            width: 150
        },
        {
            headerName: 'N° Carnet',
            field: 'ci',
            filter: true,
            width: 150
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
            headerName: 'Dirección',
            field: 'direccion',
            filter: true,
            width: 200,
        },
        {
            headerName: 'N° Calle',
            field: 'nCalle',
            filter: true,
            width: 125,
        },
        {
            headerName: 'Sexo',
            field: 'sexo',
            filter: true,
            width: 150
        },
        {
            headerName: 'Telefono',
            field: 'telefono',
            filter: true,
            width: 130
        },
        {
            headerName: 'Pago',
            field: 'pagoRegistro',
            filter: true,
            width: 110
        },
        {
            headerName: 'Acciones',
            field: 'acciones',
            width: 150,
            cellRenderer: customIconsHTML,
            cellStyle: {
                "text-align": "center"
            }
        }
    ];

    /*** GRID OPTIONS ***/
    var gridOptions = {
        defaultColDef: {
            sortable: true
        },
        enableRtl: isRtl,
        columnDefs: columnDefs,
        rowSelection: "single",
        // floatingFilter: true,
        filter: true,
        pagination: true,
        paginationPageSize: 20,
        pivotPanelShow: "always",
        colResizeDefault: "shift",
        animateRows: true,
        resizable: true
    };
    if (document.getElementById("myGrid")) {
        /*** DEFINED TABLE VARIABLE ***/
        var gridTable = document.getElementById("myGrid");

        /*** ponemos los datos del JSON en la tabla***/
        agGrid
            .simpleHttpRequest({
                url: "/app-assets/data/clientes-list.json"
            })
            .then(function (data) {
                gridOptions.api.setRowData(data);
            });

        /*** FILTER TABLE ***/
        function updateSearchQuery(val) {
            gridOptions.api.setQuickFilter(val);
        }

        $(".ag-grid-filter").on("keyup", function () {
            updateSearchQuery($(this).val());
        });

        /*** CHANGE DATA PER PAGE ***/
        function changePageSize(value) {
            gridOptions.api.paginationSetPageSize(Number(value));
        }

        $(".sort-dropdown .dropdown-item").on("click", function () {
            var $this = $(this);
            changePageSize($this.text());
            $(".filter-btn").text("1 - " + $this.text() + " de 50");
        });

        /*** EXPORT AS CSV BTN ***/
        $(".ag-grid-export-btn").on("click", function (params) {
            gridOptions.api.exportDataAsCsv();
        });

        //  filter data function
        var filterData = function agSetColumnFilter(column, val) {
            var filter = gridOptions.api.getFilterInstance(column)
            var modelObj = null
            if (val !== "all") {
                modelObj = {
                    type: "equals",
                    filter: val
                }
            }
            filter.setModel(modelObj)
            gridOptions.api.onFilterChanged()
        }
        //  filter inside role
        $("#users-list-role").on("change", function () {
            var usersListRole = $("#users-list-role").val();
            filterData("role", usersListRole)
        });
        //  filter inside verified
        $("#users-list-verified").on("change", function () {
            var usersListVerified = $("#users-list-verified").val();
            filterData("is_verified", usersListVerified)
        });
        //  filter inside status
        $("#users-list-status").on("change", function () {
            var usersListStatus = $("#users-list-status").val();
            filterData("status", usersListStatus)
        });
        //  filter inside department
        $("#users-list-department").on("change", function () {
            var usersListDepartment = $("#users-list-department").val();
            filterData("department", usersListDepartment)
        });
        // filter reset
        $(".users-data-filter").click(function () {
            $('#users-list-role').prop('selectedIndex', 0);
            $('#users-list-role').change();
            $('#users-list-status').prop('selectedIndex', 0);
            $('#users-list-status').change();
            $('#users-list-verified').prop('selectedIndex', 0);
            $('#users-list-verified').change();
            $('#users-list-department').prop('selectedIndex', 0);
            $('#users-list-department').change();
        });

        /*** INIT TABLE ***/
        new agGrid.Grid(gridTable, gridOptions);
    }
    // users language select
    if ($("#users-language-select2").length > 0) {
        $("#users-language-select2").select2({
            dropdownAutoWidth: true,
            width: '100%'
        });
    }
    // users music select
    if ($("#users-music-select2").length > 0) {
        $("#users-music-select2").select2({
            dropdownAutoWidth: true,
            width: '100%'
        });
    }
    // users movies select
    if ($("#users-movies-select2").length > 0) {
        $("#users-movies-select2").select2({
            dropdownAutoWidth: true,
            width: '100%'
        });
    }
    // users birthdate date
    if ($(".birthdate-picker").length > 0) {
        $('.birthdate-picker').pickadate({
            format: 'mmmm, d, yyyy'
        });
    }
    // Input, Select, Textarea validations except submit button validation initialization
    if ($(".users-edit").length > 0) {
        $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
    }
});
