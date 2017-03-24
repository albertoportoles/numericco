UTIL = {

  fire : function(func,funcname, args){

    var namespace = ADMIN;  // indicate your obj literal namespace here

    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
      namespace[func][funcname](args);
    }
  },

  loadEvents : function(){

    var bodyId = document.body.id;
    // hit up common first.
    UTIL.fire('common');

    // do all the classes too.
    /*
    $.each(document.body.className.split(/\s+/),function(i,classnm){
      UTIL.fire(classnm);
      UTIL.fire(classnm,bodyId);
    });
    */

    var controller = document.body.getAttribute('data-controller');
    var action = document.body.getAttribute('data-action');
    UTIL.fire(controller);

    if(action != ""){

      if(action == "admin_index" || action == "admin_edit"){
        UTIL.fire('common', action);        
      }
      UTIL.fire(controller,action);
    }
    UTIL.fire('common','finalize');

  }

};

// kick it all off here
$(document).ready(UTIL.loadEvents);
