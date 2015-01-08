// ==UserScript==
// @name        Ravelry Forum SpeedIgnore
// @namespace   Yanick
// @description Quick button to ignore threads
// @include     http://www.ravelry.com/discuss/*
// @include     http://www.ravelry.com/discuss
// @require     https://code.jquery.com/jquery-2.1.3.min.js
// @version     1
// @grant       none
// ==/UserScript==

//Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);


function ignore_thread(elem) {
  var $e = $(this);
  console.log($e.closest('h2'));
    
  var topic = $e.parent().attr('id').replace( /topic_row_/, '');
  var forum = $e.closest('.forum_glance').find('h2').text();
  forum = forum.replace( / /g, '-');

  var url = "http://www.ravelry.com/discuss/" + forum + "/topics/" + topic + "/ignore?location=glance";
  
  $e.closest('tr').find('td.status img').attr( 'src', 
       'http://style0.ravelrycache.com/images/silk-bullet_red.png');
  
  $.post( url );
  
  $e.closest('tr').hide();
  
  return false; 
  
}

$(function () {
  $('table.topics thead tr').prepend( "<th></th>");
  
  var $td = $('<td class="kill"></td>');
  
  var $kill = $("<span>☠</span>");
  $td.append($kill);
  $('table.topics tbody tr').prepend( $td );

  $('td.kill').unbind('click').on( 'click', ignore_thread)
})