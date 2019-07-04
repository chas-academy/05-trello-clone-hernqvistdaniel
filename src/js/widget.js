module.exports = (function($, window, document, undefined) {
  
  $.widget("hejsan.bgChanger", {
    options: {
      red: 255,
      green: 0,
      blue: 0,
    },

    _create: function() {
      $('body')._on( this.element, {
        click: "random"
      });
  },

  random: function (event) {

    var colors = {
      red: Math.floor( Math.random() * 256 ),
      green: Math.floor( Math.random() * 256 ),
      blue: Math.floor( Math.random() * 256 )
    };
   
    this.element
      .css( "background", "rgb(" +
      colors.red +"," +
      colors.green + "," +
      colors.blue + ")"
    );
  }
  });
})(jQuery, window, document);