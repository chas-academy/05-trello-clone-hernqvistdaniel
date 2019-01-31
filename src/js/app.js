import $ from 'jquery';
import '../css/styles.css';

require('webpack-jquery-ui');

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function ($) {
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
      
     

      function createTabs() {}

      function createDialogs() {}

      /*
       *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
       *  createList, deleteList, createCard och deleteCard etc.
       */
      function bindEvents() {
        DOM.$newListButton.on('click', createList);
        DOM.$deleteListButton.on('click', deleteList);

        DOM.$newCardForm.on('submit', createCard);
        DOM.$deleteCardButton.on('clickg', deleteCard);
      }

      /* ============== Metoder för att hantera listor nedan ============== */
      function createList() {
        event.preventDefault();
          
          console.log("This should create a newer list");
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
            .before('<li class="card">' + cardValue + '<button class="button delete">X</button></li>');
            $('.delete').click(deleteCard);
          }   
      

        function deleteCard() {
          $('.card').on('click', '.delete', function () {
            $(this).parent().fadeOut(1200, function(){
              remove();
              
            });
            console.log("This should delete the card you clicked on");
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
          createTabs();
          createDialogs();
          
          bindEvents();
        }

        // All kod här
        return {
          init: init
        };
      })($);

    //usage
    $("document").ready(function () {
      jtrello.init();
    });