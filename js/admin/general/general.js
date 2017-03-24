
function adjustmainpanelheight() {
   // Adjust mainpanel height
   var docHeight = $(document).height();
   /*
   if(docHeight > $('.mainpanel').height())
      $('.mainpanel').height(docHeight);
   */
}

function closeVisibleSubMenu() {
   $('.leftpanel .nav-parent').each(function() {
      var t = $(this);
      if(t.hasClass('nav-active')) {
         t.find('> ul').slideUp(200, function(){
            t.removeClass('nav-active');
         });
      }
   });
}


function afterValidate(data, status, evento){

	$(".message").remove();
	$(".err-msg").remove();


	if(status == 'error'){ //errores conexion
		if(evento.status == 403){
			$(".login.dialog_form").dialog("open");
		}
	}

	if (data.status == 'errorLogin') { //error sesión
		$(".login.dialog_form").dialog("open");

	} else if (data.status == 'error') { //error validacion

		onError(data);

  } else if (data.status == 'ok') { //todo bien
		onSuccess(data.message);
	}
}

function onSuccess(message) {
	flashMessage(message);
	$("A.boton_admin.guardar").html('<span class="guardar">Guardar</span>');
};

function onError(data) {

	flashMessage(data.message);

	$.each(data.errors, function(model, errores) {

		for (fieldName in this) {
      var element1 = $("#" + camelize(model) + "Nuevo" + camelize(fieldName)).parent();
			var element = $("#" + camelize(model) + camelize(fieldName)).parent();
      if(element1){
        $('<div class="err-msg"></div>').appendTo(element1);
  			element1.find(".err-msg").addClass(data.errors).text(this[fieldName][0])
      }

      $('<div class="err-msg"></div>').appendTo(element);
      element.find(".err-msg").addClass(data.errors).text(this[fieldName][0])

		}

		$("A.boton_admin.guardar").html('<span class="guardar">Guardar</span>');
	});

};

function flashMessage(message) {
	var _insert = $(document.createElement('div')).css('display', 'none');
	_insert.attr('id', 'flashMessage').addClass('message').text(message);
	_insert.insertBefore($("#preloader")).fadeIn();
}

function camelize(string) {
	var a = string.split('_'), i;
	s = [];
	for (i=0; i<a.length; i++){
		s.push(a[i].charAt(0).toUpperCase() + a[i].substring(1));
	}
	s = s.join('');
	return s;
};

function getExtension(filename){
	return filename.split('.').pop();
}



//VIEW FUNCTIONS

function reset_html(id) {
  $('#'+id).html($('#'+id).html());
}

//CHECK VIDEO URL
function check_video_url(url){
  var datos = {
    "fuente" : "",
    "clave" : ""
  };
  if(url.indexOf("youtube") == -1 && url.indexOf("vimeo") == -1){
    alert("URL inválida");
    return false;
  }else{
    if(url.indexOf("youtube") != -1){
      datos.fuente = "youtube";
      datos.clave = getURLParam(url,'v');
      //datos.imagen = "http://i.ytimg.com/vi/"+datos.clave+"/default.jpg";

    }else if(url.indexOf("vimeo") != -1){
      datos.fuente = "vimeo";
      datos.clave = url.split("/").pop();
    }
  }
  return datos;
}

function getURLParam(url,strParamName){
  var strReturn = "";
  var strHref = url;
  if ( strHref.indexOf("?") > -1 ){
  var strQueryString = strHref.substr(strHref.indexOf("?"));
  var aQueryString = strQueryString.split("&");
  for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
    if (aQueryString[iParam].indexOf(strParamName + "=") > -1 ){
    var aParam = aQueryString[iParam].split("=");
    strReturn = aParam[1];
    break;
    }
  }
  }
  return unescape(strReturn);
}
