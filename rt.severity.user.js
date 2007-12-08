// ==UserScript==
// @name           RtSeverityOrdering
// @version        0.03
// @author         Yanick Champoux <yanick+gm@babyl.dyndns.org>
// @namespace      http://babyl.dyndns.org/
// @description    Order RT bugs by severity
// @include        http://rt.cpan.org/Public/Dist/Display.html*
// @include        http://rt.cpan.org/Dist/Display.html*
// ==/UserScript==
//
// Changes
// 0.03 - Nov 27, 2007
// * adding 'Critical' level
//
// 0.02 - Nov 26, 2007
// * removed GM_logs
//
// 0.01 - Nov 26, 2007
// * initial release


var table = document.getElementsByTagName( 'table' )[0];
var rows = table.rows;
var header_row = rows[0];

if ( header_row.cells[3].innerHTML.match( /Severity/ ) ) {
        header_row.cells[3].innerHTML = 
            "<a id='orderSeverity' href='#dummy'>Severity</a>";
}

document.addEventListener( 'click', function( event ) {
    if( event.target.id != "orderSeverity" ) {
        return;
    }
    order_by_severity();
    event.stopPropagation();
    event.preventDefault();
}, true );

// --- utility functions ----------------------------------

function order_by_severity() {

    var data_rows = new Array;
    for( var i = 1; i < rows.length; i++ ) { data_rows.push( rows[i] ); } 

    data_rows.sort( by_severity );

    var data_rows_content = new Array();   
    for( var i = 0; i < data_rows.length; i++ ) {
        data_rows_content.push( data_rows[i].innerHTML );
    }

    for( var i = 1; i < rows.length; i++ ) { 
        rows[i].innerHTML = data_rows_content[i-1];
    } 

    return;
}

function by_severity( a, b ) {
    var sev_a = severity_level( a );
    var sev_b = severity_level( b );

    // GM_log( "sev: " + sev_a + " " + sev_b );
    return sev_b - sev_a;
}

function severity_level( row ) {
    var severity = row.cells[3].innerHTML;

    // GM_log( severity );

    // GM_log( severity.match( /Important/ ) );

    return   severity.match( /Critical/    ) ?  5
           : severity.match( /Important/   ) ?  4
           : severity.match( /Normal/      ) ?  3
           : severity.match( /Unimportant/ ) ?  2
           : severity.match( /Wishlist/    ) ?  1 
           :                                    0
           ;
}

