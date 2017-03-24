;ADMIN = {

  common : {
    init : function(){
      console.log("Ejecutamos Comun inicio");

      $(window).load(function() {
         $('#status').fadeOut();
         $('#preloader').delay(350).fadeOut(function(){
            $('body').delay(350).css({'overflow':'visible'});
         });

         var body = $('body');
         if($(window).width() > 992){
           body.removeClass('leftpanel-collapsed');
         }
      });

     },

    admin_index : function(){
       console.log("Ejecutamos Comun Admin Index");

       $(document).ready(function(){

          $(".add_from_admin .submit INPUT").click(function(e){
            var error_empty_input = false;
            $('.add_from_admin .required INPUT[type="text"]').each(function(e){
              if( $(this).val() == "" ){
                error_empty_input = true;
              }
            });
            if(error_empty_input){
              e.preventDefault();
            }
          });

          $('.boton_admin.add').click(function(){
            //$('#add_user').slideToggle('fast');
            $(".add_from_admin").dialog("open");
            return false;
          });

          setTimeout(function() {
            $("#flashMessage").fadeOut(1500);
          },1500);
        });
     },

    admin_edit : function(){
       console.log("Ejecutamos Comun Admin Edit");

       $(document).ready( function(){

         $.datepicker.regional['es'] = {
             closeText: 'Cerrar',
             prevText: 'Ant',
             nextText: 'Sig',
             currentText: 'Hoy',
             monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
             monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
             dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
             dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
             dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
             weekHeader: 'Sm',
             dateFormat: 'dd/mm/yy',
             firstDay: 1,
             isRTL: false,
             showMonthAfterYear: false,
             yearSuffix: ''
         };
         $.datepicker.setDefaults($.datepicker.regional['es']);
         $("#datepicker").datepicker({ dateFormat: 'yy-mm-dd'+' 00:00:00' });
         $( "#tabs" ).tabs();

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

         $('#uploadvideo').click(function(e){
          e.preventDefault();
          //$('#dialog_video_ext').dialog('open');
          });

         $('.categoria .checkbox INPUT').on('click',function(){

           if( !$(this).parent().parent().parent().hasClass("activosiono")){

               if( $(this).is(':checked') ){
                   var accion = 'add_categoria_ajax';
               }else{
                   var accion = 'delete_categoria_ajax';
               }
               var post_id = item;
               var categoria_id = $(this).val();

               $.get('/admin/'+model_slug+'/'+accion+'/'+item+'/'+categoria_id, function(data) {
                   //alert(data);
                   //console.log(data);
                   //ajax_loading.remove();
               });
             }
         });


         /******************************************
             PLUPLOAD
         ******************************************/
         var plupload_params = {
           runtimes : 'html5,flash',
           browse_button : 'uploadfiles',
           max_file_size : '2mb',
           url : "/images/upload_ajax/"+item+"/"+model,
           flash_swf_url : '/js/plupload/plupload.flash.swf',
           filters : [
             {title : "Archivos de imagen", extensions : "jpg,jpeg,gif,png,pdf"}
           ]
         };

         var uploader = new plupload.Uploader(plupload_params);
         uploader.init();
         uploader.bind('FilesAdded', function(up, files) {
           $.each(files, function(i, file) {
             if(file.status == 1){
               var $div = $('<div class="uploader_container"><div id="' + file.id + '" style="width: 0%;"></div></div>').delay(2000).fadeOut(2000);
               $('#upload_wrapper').append($div);
             }
           });
           up.refresh(); // Reposition Flash/Silverlight
           up.start();

         });
         uploader.bind('Error', function(up, err) {
           alert(err.message);
         });
         uploader.bind('UploadProgress', function(up, file) {
           $('#' + file.id).css('width',file.percent + "%");
         });
         uploader.bind('FileUploaded', function(up, file, r) {
           $('#' + file.id)
             .addClass('finished')
             .css('width',"100%");
           if(r.status == 200){
             var $div = $(r.response);
             $('#upload').before($div);
             //console.log( $div.attr('id') );
             $div.hide().slideDown(1000);
           }
           });

         $("#ImageAdminEditForm .submit input").click(function(e){
           e.preventDefault();
           if( $('#ImageUrl').val()  ){
             json_video_ext = check_video_url( $('#ImageUrl').val() );
             if(json_video_ext != null){
               var data = {
                 "data[fuente]": json_video_ext.fuente,
                 "data[clave]": json_video_ext.clave
               };
               //$('#dialog_video_ext').dialog('close');

               $('#modal_video').hide();
               $.post('/admin/images/add_video/'+item+'/'+model, data, function(div){
                 $('#ImageUrl').val(""); //vaciamos el input
                 var $div = $(div);
                 $('#upload').before($div);
                 console.log( $div.attr('id') );
                 $div.hide().slideDown(1000);

               });
             }
           }
           return false;
         });

         $('.ckeditor').ckeditor({
           toolbar: [
             [ 'Bold', 'Italic','Format', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'ReveFormat' ],
             [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],
             [ 'Image'],
             [ 'Source']
           ],
           skin: 'flat',
           height: 500,

           // Upload images to a CKFinder connector (note that the response type is set to JSON).
           uploadUrl: '/js/admin/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',

           // Configure your file manager integration. This example uses CKFinder 3 for PHP.
           filebrowserBrowseUrl: '/js/admin/ckfinder/ckfinder.html',
           filebrowserImageBrowseUrl: '/js/admin/ckfinder/ckfinder.html?type=Images',
           filebrowserUploadUrl: '/js/admin/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
           filebrowserImageUploadUrl: '/js/admin/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',

           // The following options are not necessary and are used here for presentation purposes only.
           // They configure the Styles drop-down list and widgets to use classes.

           stylesSet: [
             { name: 'Narrow image', type: 'widget', widget: 'image', attributes: { 'class': 'image-narrow' } },
             { name: 'Wide image', type: 'widget', widget: 'image', attributes: { 'class': 'image-wide' } }
           ],

           // Load the default contents.css file plus customizations for this sample.
           contentsCss: [ CKEDITOR.basePath + 'contents.css', 'http://sdk.ckeditor.com/samples/assets/css/widgetstyles.css' ],

           // Configure the Enhanced Image plugin to use classes instead of styles and to disable the
           // resizer (because image size is controlled by widget styles or the image takes maximum
           // 100% of the editor width).
           image2_alignClasses: [ 'image-align-left', 'image-align-center', 'image-align-right' ],
           image2_disableResizer: true
         });

           $("#imagenes_sortable").sortable({
             /*placeholder: "ui-state-highlight",*/
             forcePlaceholderSize: true,
             items: 'DIV.caja_ver_foto',
             axis: 'y',
             handle: ".handle",
             stop:function(event, ui) {},
             update:function(event, ui) {
               $.ajax({
                 async:true,
                 type:'post',
                 url:'/admin/images/ordenar/'+model,
                 data:$('#imagenes_sortable').sortable('serialize')
               });

             }
           });

       });

     },

     admin_search: function(){
       console.log("Ejecutamos Search Posts");

       $(document).ready(function(){

         $(".add_from_admin .submit INPUT").click(function(e){
           var error_empty_input = false;
           $('.add_from_admin .required INPUT[type="text"]').each(function(e){
             if( $(this).val() == "" ){
               error_empty_input = true;
             }
           });
           if(error_empty_input){
             e.preventDefault();
           }
         });

         $('.boton_admin.add').click(function(){
           //$('#add_user').slideToggle('fast');
           $(".add_from_admin").dialog("open");
           return false;
         });

          setTimeout(function() {
            $("#flashMessage").fadeOut(1500);
          },1500);

        });
     },

    finalize : function(){
      console.log("Ejecutamos Comun fin");

      $(window).resize(function() {
        if($(window).width() > 992){
          var body = $('body');
          body.removeClass('leftpanel-collapsed');
        }
      });

      $(document).ready(function() {

        $('A.boton_admin.guardar').click(function(e) {
          var text = $("a.boton_admin.guardar").html();
          $("a.boton_admin.guardar").html("guardando...");

           $.ajax({
              url: '/admin/'+model_slug+'/edit',
              type: 'POST',
              data: $('#'+model+'AdminEditForm').serialize(),
              dataType: 'json',
              success: function(data) {
                  console.log(data);
                  afterValidate(data, data.status , e);
              },
              error: function(data) {

              },
           });
        });

        $('.leftpanel .nav-parent > a').on('click', function() {
           var parent = $(this).parent();
           var sub = parent.find('> ul');

           if(!$('body').hasClass('leftpanel-collapsed')) {
              if(sub.is(':visible')) {
                 sub.slideUp(200, function(){
                    parent.removeClass('nav-active');
                 });
              } else {
                 sub.slideDown(200, function(){
                    parent.addClass('nav-active');
                 });

                 $('.nav-parent.nav-active ul').slideUp(200, function(){
                    $(this).parent().removeClass('nav-active');
                 });
              }
           }
           return false;
        });


        $('.menutoggle').click(function(){

          if($(window).width() < 992){
            var body = $('body');
            body.toggleClass('leftpanel-collapsed');
          }

        });

        /*
        $('A.ajax_bool').click(function(e){
            e.preventDefault();
            var $this = $(this);
            var url = $(this).attr('href');
            var url_arr = url.split("/");
            url_arr.splice( url_arr.indexOf('boolean_ajax')+1 , 3);
            $this.html('<span class="estado_loading">esperando...</span>');
            $.get(url, function(data){
                if(!data.error){
                    //data.estado = 1, data.field = activo, data.id = 1;
                    if(data.estado == 1){
                        var span = '<span class="estado_activo">Activo</span>';
                    }else{
                        var span = '<span class="estado_inactivo">Inactivo</span>';
                    }
                    var href = url_arr.join('/')+"/"+data.id+"/"+data.estado+"/"+data.field;
                    if(data.estado == 1){
                        $this.removeClass("btn-danger-alt").addClass("btn-success-alt");
                    }else{
                        $this.removeClass("btn-success-alt").addClass("btn-danger-alt");
                    }
                    $this
                        .attr('href', href)
                        .html(span);
                }
            }, "json")
                .fail(function(result) {
                    console.log(result);
                });
        });

        */

        $('A.boton_admin.activar').click(function(e){
            e.preventDefault();
            var $this = $(this);
            var url = $(this).attr('href');
            var url_arr = url.split("/");
            url_arr.splice( url_arr.indexOf('boolean_ajax')+1 , 3);
            var text = $this.find('span').html();
            $this.find('span').html('esperando...');
            //$this.html('<span class="estado_loading">esperando...</span>');
            $.get(url, function(data){
                if(!data.error){
                    //data.estado = 1, data.field = activo, data.id = 1;
                    if(data.estado == 1){
                        var span = '<span class="desactivar">Desactivar</span>';
                    }else{
                        var span = '<span class="activar">Activar</span>';
                    }
                    var href = url_arr.join('/')+"/"+data.id+"/"+data.estado+"/"+data.field;
                    $this
                        .attr('href', href)
                        .html(span);
                }
            }, "json")
                .fail(function(result) {
                    console.log(result);
                });
        });

        $('.sub.categoria.checkbox .tit').click(function(e){
          $(this).parent().toggleClass("open");
        });

        $('#uploadvideo').click(function(e){
      		e.preventDefault();
      		//$('#dialog_video_ext').dialog('open');
      	});

        $('.boton_admin.add').click(function(){
      		//$('#add_user').slideToggle('fast');
      		$(".add_from_admin").dialog("open");
      		return false;
      	});

        setTimeout(function() {
            $("#flashMessage").fadeOut(1500);
        },1500);



      });

    }
  },

  general : {
    init: function(){
      console.log("Ejecutamos General");
    },
    home: function(){
      console.log("Ejecutamos General Home");
    },
    finalize: function(){
      console.log("Ejecutamos General");
    },
  },

  posts : {
    init: function(){
      console.log("Ejecutamos Posts");
    },

    admin_edit: function(){
      console.log("Ejecutamos Edit Posts");

      $(document).ready(function(){

        $("BODY").ajaxComplete(function(xml, s, settings){
          //Si es un archivo subido
          //var url = settings.url.split('/');
          var url = "upload_ajax";
          if(url[2] == "upload_ajax" || url[2] == "add_video_ajax"){
            $('.ajax_uploading').before(s.responseText);
            tooltip.init();
            $('.ajax_uploading:first').remove();
            $(".message").remove();
            var ok_mensaje = "Imagen subida.";
            flashMessage(ok_mensaje);
          }
        });
      });
    },



    finalize: function(){
      console.log("Ejecutamos Fin Posts");

    },

  },

  categorias : {
    init: function(){
      console.log("Ejecutamos Categorias");
    },

    admin_edit: function(){
      console.log("Ejecutamos Edit Categorias");
    },
    admin_listar: function(){
      console.log("Ejecutamos Listar Categorias");

      $(".add_from_admin .submit INPUT").click(function(e){
          var error_empty_input = false;
          $('#CategoriaAdminListarForm .required INPUT[type="text"]').each(function(e){
              if( $(this).val() == "" ){
                  error_empty_input = true;
              }
          });
          if(error_empty_input){
              e.preventDefault();
          }
      });


      $('.boton_admin.add').click(function(){
          //$('#add_user').slideToggle('fast');
          $(".add_from_admin").dialog("open");
          return false;
      });

    },
    finalize: function(){
      console.log("Ejecutamos Fin Categorias");
    }
  },

  users : {
    init: function(){
      console.log("Ejecutamos Users");
    },

    admin_edit: function(){
      console.log("Ejecutamos Edit Users");

      $(document).ready(function(){
        $("BODY").ajaxComplete(function(xml, s, settings){
          //Si es un archivo subido
          //var url = settings.url.split('/');
          var url = "upload_ajax";
          if(url[2] == "upload_ajax" || url[2] == "add_video_ajax"){
            $('.ajax_uploading').before(s.responseText);
            tooltip.init();
            $('.ajax_uploading:first').remove();
            $(".message").remove();
            var ok_mensaje = "Imagen subida.";
            flashMessage(ok_mensaje);
          }
        });
      });
    },
  },

};
