// ==UserScript==
// @name           CPAN_Meta
// @version        0.01
// @author         Yanick Champoux <yanick+gm@babyl.dyndns.org>
// @namespace      http://babyl.dyndns.org/
// @description    Extract info from a distro's META.yml and display it on its CPAN page 
// @include        http://search.cpan.org/*
// ==/UserScript==
//
// Changes
//
// 0.01 - Aug 14, 2008
// * Initial release
//

for each ( a in document.getElementsByTagName( 'a' ) ) {
    if ( a.innerHTML == "META.yml" ) {
        GM_xmlhttpRequest({ 
            method: "GET",
            url: a.href,
            onload: function( resp ) {
               // GM_log( resp.responseText );
             
                var meta = resp.responseText;

                add_homepage( meta );
                add_mailinglist( meta ); 
                add_bugtracker( meta );
                add_repository( meta );
            }
        });
        break;
    }
}


function add_bugtracker( meta ) {
    var result = meta.match( /bugtracker:\s+(\S+)/i ); 

    var tracker = result[1];

    if( !tracker ) { return }

    if ( tracker.match( 'http://rt.cpan.org' ) ) {
        // don't bother, there's support for
        // RT on the page already
        return;
    }

    add_summary_item( 
            "bugtracker",
            "<a href='" + tracker + "'>" + tracker + "</a>"
    );
}

function add_homepage( meta ) {
    var result = meta.match( /homepage:\s+(\S+)/i ); 

    var home = result[1];

    if( !home ) { return }

    add_summary_item( 
            "homepage",
            "<a href='" + home + "'>" + home + "</a>"
    );
}

function add_mailinglist( meta ) {
    var result = meta.match( /mailinglist:\s+(\S+)/i ); 

    var list = result[1];

    if( !list ) { return }

    add_summary_item( 
            "Mailing list",
            "<a href='" + list + "'>"
                + list + "</a>"
    );
}

function add_repository( meta ) {
    var result = meta.match( /repository:\s+(\S+)/i ); 

    var repo = result[1];

    if( !repo ) { return }

    add_summary_item( 
            "Repository",
            "<a href='" + repo + "'>"
                + repo + "</a>"
    );
}

function add_summary_item ( title, content ) {

    var tables = document.getElementsByTagName( 'table' );

    tables[0].innerHTML = tables[0].innerHTML.replace( 
        /<tr>\s*<td.*?>CPAN Testers/i, 
        "<tr><td class='label'>"
        + title + "</td>"
        + "<td class='cell' colspan='3'>"
        + content
        + "</td></tr>$&" );
}
