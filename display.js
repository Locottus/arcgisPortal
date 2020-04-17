function cargaDepto() {
  var select = document.getElementById("selectDepartamento");
  //console.log(departamentos);
  for (var i = 0; i < departamentos.length; i++) {
    var el = document.createElement("option");
    el.textContent = departamentos[i].departamen_1;
    el.value = departamentos[i].departamen_1;
    select.appendChild(el);
  }
}

function clearSelect(select) {
  var length = select.options.length;
  for (i = length - 1; i >= 0; i--) {
    select.options[i] = null;
  }
}

function cargaMuni() {
  var select = document.getElementById("selectMunicipio");
  clearSelect(select);
  // console.log("cargaMuni()");
  var d = document.getElementById("selectDepartamento");
  var dval = d.options[d.selectedIndex].value;
  // console.log(dval);
  for (var i = 0; i < municipios.length; i++) {
    if (municipios[i].departamen_1 === dval) {
      var el = document.createElement("option");
      el.textContent = municipios[i].municipi_1;
      el.value = municipios[i].municipi_1;
      select.appendChild(el);
    }
  }
}

function cargaNecesidad() {
  var select = document.getElementById("selectNecesidad");
  //console.log(departamentos);
  for (var i = 0; i < necesidad.length; i++) {
    var el = document.createElement("option");
    el.textContent = necesidad[i].descripcion;
    el.value = necesidad[i].descripcion;
    select.appendChild(el);
  }
}

function unhide(elemento) {
  document.getElementById(elemento).style.display = "block";
}

function hide(elemento) {
  document.getElementById(elemento).style.display = "none";
}

//anfang funktion
window.onload = function () {
  cargaNecesidad();
  cargaDepto();
};


function postData(){
    const src = 'Incyt WebPage SOS Agua #SOSAGUA';
    const url = "http://localhost:3000/incyt/api/sosagua/createalerts";
    var template = '{' + 
      '"id":"'  +           Date.now()  +  '"' + "," +
      '"name":"'  +           document.getElementById("email").value +  '"' +"," +
      '"screen_name":"'  +    document.getElementById("nombre").value +  '"' + "," +
      '"retweet_count":"'  +  Date.now() +  '"' +"," +
      '"text":"'  +           document.getElementById("txt").value +  '"' + "," +
      '"location":' +        '["' + document.getElementById("selectDepartamento").value + '","' +document.getElementById("selectMunicipio").value + '"]' + "," +
      '"coordinates":"'  +     "[" + x.toString() + "," + y.toString() +"]"  + '"' + "," +
      '"geo_enabled":"'  +     'True' +  '"' + "," +
      '"geo":"'  +            'True' +  '"' +"," +
      '"created_at":"'  +      Date.now() +  '"' +"," +
      '"favorite_count":"'  +  Date.now() +  '"' +"," +
      '"hashtags":'      +   '[' + '"#SOSAGUA","'  + document.getElementById("selectNecesidad").value + '"],' +
      '"status_count":"'  +  Date.now() +  '"' +"," +
      '"place":' +           '["' + document.getElementById("selectDepartamento").value + '","' +document.getElementById("selectMunicipio").value + '"]' + "," +
      '"source":"'  +          src + '"' +
  '}';


    console.log(jsontxt);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    //TODO ADD ORIGEN,MUNICIPIO,NECESIDAD -->IDS AND SEND POST REQUEST
    //twitjson,twitstring,origen,municipio, necesidad
    var jsontxt = '{"twitjson":' + template + ',"twitstring": ' + template + '}';
    var obj = JSON.parse(jsontxt);
    //console.log(xhr.send(obj));

    //xhr.send(JSON.stringify({ value: value    }));
    //alert("la informacion ha sido enviada");
    hide('infoForm');
}
//https://stackoverflow.com/questions/6396101/pure-javascript-send-post-data-without-a-form