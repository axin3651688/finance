import { Injectable } from '@angular/core';
import { httpRequest } from '@grapecity/wijmo';
//
var cache = {};
@Injectable()
export class DataService {
    getCompany(query: string, max: number, callback: Function) {
        // try getting the result from the cache
        var result = cache[query],
            protocol = "https";
        if (result) {
            //console.log('found "' + query + '" in cache, ' + result.length + ' items.');
            callback(result);
            return;
        }
        // IE9 fix
        if (navigator.appVersion.indexOf("MSIE 9.") != -1) {
            //$.support.cors = true;
            protocol = "http";
        }
    
        // not in cache, search Quandl's "Wiki EOD Stock Prices"
        httpRequest(protocol + '://www.quandl.com/api/v2/datasets.json',
            {
                data: {
                    auth_token: "rX6NsszGKZp32RUbA7SR",
                    query: query.trim(),
                    page: 1,
                    per_page: 20,
                    source_code: 'WIKI'
                },
                success: function (result: any) {
                    let res = JSON.parse(result.response);
                    // parse result
                    var lines = res.docs,
                        matches = [];
                    //console.log('got result with ' + lines.length + ' matches.');
                    for (var i = 0; i < lines.length; i++) {
                        var item = lines[i];
                        var symbol = item.code,
                            name = item.name.substring(0, item.name.indexOf('(')),
                            symbolName = '<b>' + symbol + '</b>: ' + name;
                        matches.push({ symbol: symbol, name: name, symbolName: symbolName });
                    }
        
                    // store result in cache
                    cache[query] = matches;
        
                    // and return the result
                    callback(matches);
                },
                error: function (error: any) {
                    console.log('error: ' + error.responseText);
                    cache[query] = null; // << no point in trying this query again
                    callback(null);
                }
            }
        );
    }
}