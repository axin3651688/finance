/* eslint-disable */
require('script-loader!file-saver');
import XLSX from 'xlsx'

function generateArray(table) {
    var out = [];
    var rows = table.querySelectorAll('tr');
    var ranges = [];
    for (var R = 0; R < rows.length; ++R) {
        var outRow = [];
        var row = rows[R];
        var columns = row.querySelectorAll('td');
        for (var C = 0; C < columns.length; ++C) {
            var cell = columns[C];
            var colspan = cell.getAttribute('colspan');
            var rowspan = cell.getAttribute('rowspan');
            var cellValue = cell.innerText;
            if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

            //Skip ranges
            ranges.forEach(function(range) {
                if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
                    for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
                }
            });
            debugger;
            //Handle Row Span
            if (rowspan || colspan) {
                rowspan = rowspan || 1;
                colspan = colspan || 1;
                ranges.push({
                    s: {
                        r: R,
                        c: outRow.length
                    },
                    e: {
                        r: R + rowspan - 1,
                        c: outRow.length + colspan - 1
                    }
                });
            };
            debugger;
            //Handle Value
            outRow.push(cellValue !== "" ? cellValue : null);

            //Handle Colspan
            if (colspan)
                for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
        }
        out.push(outRow);
    }
    return [out, ranges];
};

function datenum(v, date1904) {
    if (date1904) v += 1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
    debugger;
    var ws = {};
    // data = XLSX.utils.format2Sheet(data);
    var range = {
        s: {
            c: 10000000,
            r: 10000000
        },
        e: {
            c: 0,
            r: 0
        }
    };
    for (var R = 0; R != data.length; ++R) {
        for (var C = 0; C != data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R;
            if (range.s.c > C) range.s.c = C;
            if (range.e.r < R) range.e.r = R;
            if (range.e.c < C) range.e.c = C;
            var cell = {
                v: data[R][C]
            };
            if (cell.v == null) continue;
            var cell_ref = XLSX.utils.encode_cell({
                c: C,
                // r: R > 0 ? R + 1 : R
                r: R
            });
            if (typeof cell.v === 'number') cell.t = 'n';
            else if (typeof cell.v === 'boolean') cell.t = 'b';
            else if (cell.v instanceof Date) {
                cell.t = 'n';
                cell.z = XLSX.SSF._table[14];
                cell.v = datenum(cell.v);
            } else cell.t = 's';

            ws[cell_ref] = cell;
            if (C == 0 && R == 1) {
                let cellSum = {
                    s: { //s为开始
                        c: 0, //开始列
                        r: 1 //可以看成开始行,实际是取值范围
                    },
                    e: { //e结束
                        c: 0, //结束列
                        r: 7 //结束行
                    }
                }
                ws['!merges'] ? "" : ws['!merges'] = [];
                ws['!merges'].push(cellSum);
            }
            if (C == 2 && R < 7) {
                let cellSum = {
                    s: { //s为开始
                        c: 2, //开始列
                        r: R //可以看成开始行,实际是取值范围
                    },
                    e: { //e结束
                        c: 3, //结束列
                        r: R //结束行
                    }
                }
                ws['!merges'] ? "" : ws['!merges'] = [];
                ws['!merges'].push(cellSum);
            }
            if (C == 1 && R == 7) {
                let cellSum = {
                    s: { //s为开始
                        c: 1, //开始列
                        r: 7 //可以看成开始行,实际是取值范围
                    },
                    e: { //e结束
                        c: 3, //结束列
                        r: 7 //结束行
                    }
                }
                ws['!merges'] ? "" : ws['!merges'] = [];
                ws['!merges'].push(cellSum);
            }
            if (C == 0 && R == 8) {
                let cellSum = {
                    s: { //s为开始
                        c: 0, //开始列
                        r: 8 //可以看成开始行,实际是取值范围
                    },
                    e: { //e结束
                        c: 0, //结束列
                        r: 18 //结束行
                    }
                }
                ws['!merges'] ? "" : ws['!merges'] = [];
                ws['!merges'].push(cellSum);
            }
            if (C == 1 && R == 18) {
                let cellSum = {
                    s: { //s为开始
                        c: 1, //开始列
                        r: 18 //可以看成开始行,实际是取值范围
                    },
                    e: { //e结束
                        c: 3, //结束列
                        r: 18 //结束行
                    }
                }
                ws['!merges'] ? "" : ws['!merges'] = [];
                ws['!merges'].push(cellSum);
            }
            if (C == 0 && R == 19) {
                let cellSum = {
                    s: { //s为开始
                        c: 0, //开始列
                        r: 19 //可以看成开始行,实际是取值范围
                    },
                    e: { //e结束
                        c: 0, //结束列
                        r: 20 //结束行
                    }
                }
                ws['!merges'] ? "" : ws['!merges'] = [];
                ws['!merges'].push(cellSum);
            }
            if (C == 1 && (R == 19 || R == 20 || R == 21)) {
                let cellSum = {
                    s: { //s为开始
                        c: 1, //开始列
                        r: R //可以看成开始行,实际是取值范围
                    },
                    e: { //e结束
                        c: 3, //结束列
                        r: R //结束行
                    }
                }
                ws['!merges'] ? "" : ws['!merges'] = [];
                ws['!merges'].push(cellSum);
            }
        }
    }
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
}

function Workbook() {
    if (!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

export function export_table_to_excel(id) {
    debugger;
    var theTable = document.getElementById(id);
    var oo = generateArray(theTable);
    var ranges = oo[1];

    /* original data */
    var data = oo[0];
    var ws_name = "SheetJS";

    var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data);

    /* add ranges to worksheet */
    // ws['!cols'] = ['apple', 'banan'];
    ws['!merges'] = ranges;

    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
    });

    saveAs(new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
    }), "test.xlsx")
}

export function export_json_to_excel({
    header,
    data,
    filename,
    autoWidth = true,
    bookType = 'xlsx'
} = {}) {
    debugger;
    /* original data */
    filename = filename || 'excel-list'
    data = [...data]
    data.unshift(header);
    var ws_name = "SheetJS";
    var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data);

    if (autoWidth) {
        /*设置worksheet每列的最大宽度*/
        const colWidth = data.map(row => row.map(val => {
                /*先判断是否为null/undefined*/
                if (val == null) {
                    return {
                        'wch': 10
                    };
                }
                /*再判断是否为中文*/
                else if (val.toString().charCodeAt(0) > 255) {
                    return {
                        'wch': val.toString().length * 2
                    };
                } else {
                    return {
                        'wch': val.toString().length
                    };
                }
            }))
            /*以第一行为初始值*/
        let result = colWidth[0];
        for (let i = 1; i < colWidth.length; i++) {
            for (let j = 0; j < colWidth[i].length; j++) {
                if (result[j]['wch'] < colWidth[i][j]['wch']) {
                    result[j]['wch'] = colWidth[i][j]['wch'];
                }
            }
        }
        ws['!cols'] = result;
    }

    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    var wbout = XLSX.write(wb, {
        bookType: bookType,
        bookSST: false,
        type: 'binary'
    });
    saveAs(new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
    }), `${filename}.${bookType}`);
}