const app = (function () {
    let author;
    let blueprintName;

    function getName() {
        $("#author-name").text(author + "'s " + "blueprints:");
    }

    function getBluePrintName() {
        $("#actual-name").text("Current blueprint: " + blueprintName);
    }

    function getNameAuthorBlueprints() {
        author = $("#author").val();
        if (author === "") {
            alert("Debe ingresar un nombre !");
        } else {
            const promise = $.get({
                url: "/blueprints/" + author,
                contentType: "application/json",
            });
            promise.then(function (data) {
                    parceroData(data);
                }, function (error) {
                    alert("No existen datos del autor!")
                }
            );
        }
    }

    function parceroData(data) {
        alert("si entro");
        $("#table-blueprints tbody").empty();
        if (data === undefined) {
            alert("No existe el autor!");
            $("#author-name").empty();
            $("#user-points").empty();
        } else {
            alert("si entro al segundo");
            getName();
            const datanew = data.map((elemento) => {
                return {
                    name: elemento.name,
                    puntos: elemento.points.length
                }
            });

            datanew.map((elementos) => {
                $("#table-blueprints > tbody:last").append($("<tr><td>" + elementos.name + "</td><td>" + elementos.puntos.toString() +
                    "</td><td>" + "<button  id=" + elementos.name + " onclick=app.getBlueprintByAuthorAndName(this)>open</button>" + "</td>"));
            });

            const totalPuntos = datanew.reduce((suma, {puntos}) => suma + puntos, 0);

            $("#user-points").text(totalPuntos);
        }
    }





    return {

        getNameAuthorBlueprints: getNameAuthorBlueprints,
        

    }

})();