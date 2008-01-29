// ==UserScript==
// @name           CPAN_Dependencies
// @version        0.01
// @author         Yanick Champoux <yanick+gm@babyl.dyndns.org>
// @namespace      http://babyl.dyndns.org/
// @description    Display a distribution's dependencies
// @include        http://rt.cpan.org/Public/Dist/Display.html*
// @include        http://rt.cpan.org/Dist/Display.html*
// ==/UserScript==
//
// Changes
// 0.01 - Jan 27, 2008
// * Initial release
//

var tables = document.getElementsByTagName( 'table' );

tables[0].innerHTML = tables[0].innerHTML.replace( 
    /<tr>.*?<td>.*?CPAN Testers/, "<tr id='dependencies'></tr>$&" );

tables[0].innerHTML = tables[0].innerHTML.replace( 
    /<tr>\s*<td.*?>CPAN Testers/i, 
    "<tr><td class='label'>Dependencies</td><td class='cell' colspan='3' id='deps'><a href='#dummy'>click to show dependencies</a></td></tr>$&" );

var d = document.getElementById( "deps" );


var xmlobject = (new DOMParser()).parseFromString(responseDetails.responseText, "text/xml");
