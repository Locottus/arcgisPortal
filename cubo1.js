function reporte(id) {
  console.log("entrando a generar reporte");
  //console.log(currentDepartment + ' ' + currentMunicipio + ' ' +currentMunicipioId);
  var url =
    "https://arcgis-web.url.edu.gt/incyt/api/sosagua/getalertsdetailreport" +
    "?id=" +
    id;

  $.get(url, function (data, status) {
    //console.log("Data: " + data + "\nStatus: " + status);
    console.log(data);
    if (data.length > 0) {
      console.log("desplegamos grid");
    }
  });
}

$(document).ready(function () {
  console.log("Pagina cargada correctamente");
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  const municipio = urlParams.get("municipio");
  const departamento = urlParams.get("departamento");
  console.log(id);
  console.log(municipio);
  console.log(departamento);

  document.getElementById("tituloPrincipal").innerHTML = departamento + ' ' + municipio;
  //cargamos los datos detallados
  reporte(id);
});
