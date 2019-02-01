import $ from 'jquery';
import 'jquery-ui/themes/base/all.css';
import '../css/styles.css';

require('webpack-jquery-ui');

import sortable from 'jquery-ui/ui/widgets/sortable';
import tabs from 'jquery-ui/ui/widgets/tabs';
import dialog from 'jquery-ui/ui/widgets/dialog';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function ($,) {
  "use strict"; // https://lucybain.com/blog/2014/js-use-strict/

  // Referens internt i modulen för DOM element
  let DOM = {};

  /* =================== Privata metoder nedan ================= */
  function captureDOMEls() {
    DOM.$board = $('.board');
    DOM.$listDialog = $('#list-creation-dialog');
    DOM.$columns = $('.column');
    DOM.$lists = $('.list');
    DOM.$cards = $('.card');

    DOM.$newListButton = $('button#new-list');
    DOM.$deleteListButton = $('.list-header > button.delete');

    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.card > button.delete');
  }

  function createSortables() {
    $('.list-cards').sortable({
      connectWith: '.list-cards'
    });

    $('.column').sortable({
      connectWith: '.column'
    });
  }

  $( function() {
    $( "#datepicker" ).datepicker();
  } );

  function showCreateListDialog() {
    
    $('#list-creation-dialog')
      .dialog("open");
    }

  function showCardDialog() {
    $('#card-creation-dialog')
    .dialog("open");
  }

  /*
   *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
   *  createList, deleteList, createCard och deleteCard etc.
   */
  function bindEvents() {
    DOM.$board.on('click', 'button#new-list', showCreateListDialog);

    DOM.$board.on('click', '.list-header > button.delete', deleteList);

    $('body').on('submit', 'form.submit-list', submitList);

    DOM.$board.on('submit', 'form.new-card', createCard);
    DOM.$board.on('click', '.card', showCardDialog);

    DOM.$board.on('click', '.card > button.delete', deleteCard);
  }


  /* ============== Metoder för att hantera listor nedan ============== */
  function submitList(event) {
    event.preventDefault();
    let findListName = $(this)
      .find('input[name="title"]');
    let listName = findListName.val();
    console.log(listName);

    let findDate = $(this)
      .find('input[id="datepicker"]').val();
      console.log(findDate);

    if (listName == "") return;

    $('.column:last')
      .before('<div class="column"><div class="list"><div class="list-header">' + listName + '<button class="button delete">X</button><p>Due Date: ' + findDate + '</p></div><ul class="list-cards"><li class="add-new"><form class="new-card" action="index.html"><input type="text" name="title" placeholder="Please name the card" /><button class="button add">Add new card</button></form></li></ul></div></div>');
      $('#new-list').click(createCard);
      createSortables();
      $('#list-creation-dialog').dialog("close");
  }

  function deleteList() {
    $('.list').on('click', '.delete', function () {
      $(this).closest('.column').fadeOut(1200, function () {
        $(this).closest('.column').remove();
        console.log("This should delete the list you clicked on");
      });
    });
  }

  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard(event) {
    event.preventDefault();
    let cardValue = $(this).find('input[name="title"]').val();
    if (!cardValue) return;
    $(this).closest('.add-new')
      .before('<li id="clickMe" class="card">' + cardValue +'<button class="button delete">X</button></li>');
    $('.delete').click(deleteCard);
    }


  function deleteCard() {
    $('.card').on('click', '.delete', function () {
      $(this).closest('.card').fadeOut(1200, function () {
        $(this).closest('.card').remove();
      });
    });
  }

  // Metod för att rita ut element i DOM:en
  function render() {}

  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello ::::');
    // Förslag på privata metoder
    captureDOMEls();
    bindEvents();
    createSortables();
  }

  // All kod här
  return {
    init: init
  };
})($, dialog);

//usage
$("document").ready(function () {
  jtrello.init();

  $('#list-creation-dialog')
      .dialog({
        autoOpen: false,
        close: function() {
          $("#dialog").remove();
          },
        position: {
          my: "left top",
          at: "left bottom",
          of: "#new-list",
          
        },
        closeText: ''
      });

      $('#card-creation-dialog')
      .dialog({
        autoOpen: false,
        close: function() {
          $("#dialog").remove();
          },
        position: {
          my: "left top",
          at: "left bottom",
          of: $(this).find(".card"),
          
        },
        closeText: ''
      });
});
