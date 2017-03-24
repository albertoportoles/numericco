;NUMERICCO = {

  common : {
    init : function(){

      inicio();
      css_browser_selector(navigator.userAgent);
      console.log("Ejecutamos Comun inicio");
      new WOW().init();
      var lastscroll = $(this).scrollTop();


      $(document).ready(function(){
        lastscroll = checkScroll(lastscroll);

        if(isMobile()){
          if($(window).width() <= 768){
            //$('.section-presentacion').height($(window).height());
          }
        } else{
          var s = skrollr.init();
        }

      });

    },
    finalize : function(){
      console.log("Ejecutamos Comun fin");
      var lastscroll = $(this).scrollTop();
      $(document).ready(function(){

        //initPhotoSwipeFromDOM('.gallery');
        $('.icon-nav').on('click',function(e) {
          e.preventDefault();
          toggleMenu();
        });

        $("#godown").on('click',function(e) {
            e.preventDefault();
            $(this).addClass("hacialoslados");
            $('html, body').animate({
                scrollTop: $('.next-section').offset().top
            }, 600);
        });


        $("#goup").on('click',function(e) {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
        });

      });

      $(window).scroll(function() {
        lastscroll = checkScroll(lastscroll);

        if(isMobile()){
          var fin = skrollr.get();
          if(fin){
            fin.destroy();
          }

        } else {
            var s = skrollr.init();
        }
    	});

      $(window).resize(function() {
        lastscroll = checkScroll(lastscroll);

        if(isMobile()){
          var fin = skrollr.get();
          if(fin){
            fin.destroy();
          }

        } else {
          var s = skrollr.init();
        }
      });



    }
  },

  general : {
    init: function(){
      console.log("Ejecutamos General");


    },
    contacto: function(){
      console.log("Ejecutamos General Contacto");
      google.maps.event.addDomListener(window, 'load', function () { initMap(); });

      $("#ContactoForm").validate();
      $.extend($.validator.messages, {
        required: "Rellena este campo",
        email: "Escribe tu email correctamente"
      });

      var entra = 0;
      $("#ContactoForm").on('submit',function(e){
        e.preventDefault();
        if($(this).valid()){
          if(!entra){

            $("#ContactoForm").find('button').html("Enviando");
            entra = 1;
            //sendForm('contacto_enviar', $(this), 'gracias');
            $.post('/contacto_enviar', $(this).serialize(), function (data) {
                if (data.status) {

                  //if(gracias){
                  //    window.location.href = "/gracias";
                  //} else {

                    $('.mensajesform').html();
                    $('.mensajesform').html('<div id="flashMessage" class="message">'+data.mensaje+'</div>');
                    $('.mensajesform').addClass("in");

                  //}
                }
                $("#ContactoForm").find('button').html("Enviar");
            }, 'json');

          }
        }
      });

    }

  }

};
