// ==UserScript==
// @name           MetaCPAN vote
// @namespace      http://babyl.dyndns.org/MetaCPANVote
// @description    Re-order metacpan votes
// @include        https://vote.metacpan.org/entries
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

function sort_entries() {
    var $entries = $('.sort_entry');

    var entries = $entries.get().sort(function(a,b){
        var x = parseInt($(a).find('input.title-vote').val());
        var y = parseInt($(b).find('input.title-vote').val());

        if (isNaN(x)){ x = 999; }
        if (isNaN(y)){ y = 999; }

        return x < y ? 1 : x > y ? -1 : 0;
    });

    var $help = $('div.help');

    for( var i = 0; i < entries.length; i++ ){
        $help.after( entries[i] );
    }
}

// wrap those entries with their titles
$(function(){
    $('.entry').not('.votepoll').each(function(){
        var $this = $(this);
        var $header = $this.prev();
        $header.wrap('<div class="sort_entry" />').parent().append($this);
    });
    $('.title-vote').blur(sort_entries);
});
