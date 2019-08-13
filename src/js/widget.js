module.exports = (function($, window, document, undefined) {
  $.widget("hejsan.bgChanger", {
    options: {
      // Callbacks
      change: null,
      random: null
    },

    _create: function() {
      this.changer = $("<button>", {
        text: "Change BackgroundColor!",
        class: 'button primary bgButton"'
      })
        .appendTo(this.element)
        .button();

      this._on(this.changer, {
        click: "random"
      });

      this._refresh();
    },

    _refresh: function() {
      this.element.css(
        "background-color",
        "rgb(" +
          this.options.red +
          "," +
          this.options.green +
          "," +
          this.options.blue +
          ")"
      );

      // Trigger a callback/event
      this._trigger("change");
    },

    _destroy: function() {
      this.changer.remove();

      this.element.enableSelection().css("background-color", "transparent");
    },

    // _setOptions is called with a hash of all options that are changing
    // always refresh when changing options
    _setOptions: function() {
      // _super and _superApply handle keeping the right this-context
      this._superApply(arguments);
      this._refresh();
    },

    // _setOption is called for each individual option that is changing
    _setOption: function(key, value) {
      // prevent invalid color values
      if (/red|green|blue/.test(key) && (value < 0 || value > 255)) {
        return;
      }
      this._super(key, value);
    },

    random: function(event) {
      var colors = {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256)
      };

      if ( this._trigger( "random", event, colors ) !== false ) {
        this.option( colors );
      }
    }
  });
})(jQuery, window, document);
