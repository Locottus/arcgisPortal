

      function cargaDepto(){
         var select = document.getElementById("selectDepartamento"); 
         //console.log(departamentos);
         for (var i = 0; i < departamentos.length; i++ ){
            var el = document.createElement("option");
            el.textContent = departamentos[i].departamen_1;
            el.value = departamentos[i].departamen_1;
            select.appendChild(el);
         }
      }

      function clearSelect(select) {
        var length = select.options.length;
        for (i = length -1 ; i >=0 ; i--) {
          select.options[i] = null;
        }
      }

      function cargaMuni(){
        var select = document.getElementById("selectMunicipio");
        clearSelect(select);
        // console.log("cargaMuni()");
        var d = document.getElementById("selectDepartamento");
        var dval = d.options[d.selectedIndex].value;
        // console.log(dval);
        for(var i = 0; i < municipios.length; i++){
          if (municipios[i].departamen_1 === dval){
            
            var el = document.createElement("option");
            el.textContent = municipios[i].municipi_1;
            el.value = municipios[i].id;
            select.appendChild(el);            
          }
        }
      }

      function cargaNecesidad(){
        var select = document.getElementById("selectNecesidad"); 
         //console.log(departamentos);
         for (var i = 0; i < necesidad.length; i++ ){
            var el = document.createElement("option");
            el.textContent = necesidad[i].descripcion;
            el.value = necesidad[i].id;
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
      window.onload = function() {
        cargaNecesidad();
        cargaDepto();
    }

    