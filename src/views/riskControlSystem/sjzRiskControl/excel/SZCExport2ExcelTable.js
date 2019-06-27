/* eslint-disable */
require('script-loader!file-saver');
import XLSX2 from 'xlsx'
import { throws } from 'assert';

function generateArray(tables) {
    var out = [];
    var thRows = tables[0].querySelectorAll('tr');
    var rows = tables[1].querySelectorAll('tr');
    // rows = thRows.concat(rows);
    // rows.push.apply(thRows, rows);
    // for (var i = 0; i < rows.length; i++) {
    //     thRows.push(rows[i]);
    // }
    // rows = thRows;
    var ranges = [];
    for (var R = 0; R < rows.length + thRows.length; ++R) {
        var outRow = [];
        var row;
        if (R < thRows.length) {
            row = thRows[R];
        } else {
            row = rows[R - thRows.length];
        }
        var columns = row.querySelectorAll('td');
        if (row && columns && columns.length == 0) {
            columns = row.querySelectorAll('th');
        }
        for (var C = 0; C < columns.length; ++C) {
            var cell = columns[C];
            var colspan = cell.getAttribute('colspan');
            var rowspan = cell.getAttribute('rowspan');
            var cellValue = cell.innerText || cell.textContent;
            if (C < 2 && cellValue == "") {
                cellValue = cell.querySelectorAll('div')[0].textContent;
            }
            if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

            //Skip ranges
            ranges.forEach(function(range) {
                if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
                    for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
                }
            });
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
                        r: R + (rowspan - 0) - 1,
                        c: outRow.length + (colspan - 0) - 1
                    }
                });
            };
            //Handle Value
            outRow.push(cellValue !== "" ? cellValue : null);

            //Handle Colspan
            if (colspan)
                for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
        }
        out.push(outRow);
    }
    return [out, ranges, thRows.length];
};

function datenum(v, date1904) {
    if (date1904) v += 1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}
/**
 * 找出行次的下标，此方法存在很大的偶然性，可优化程度甚高。
 * @author szc 2019年4月11日15:06:23
 */
function get_row_index(columns) {
    var arr = [];
    for (var i = 0; i < columns.length; i++) {
        if (columns[i].id.indexOf('row') != -1) {
            arr.push(i);
        }
    }
    return arr;
}

function sheet_from_array_of_arrays(data, headNum, columns) {
    // var ws = {};
    //这个处理只是针对于行次不用处理两位小数。
    var rowIndexs = get_row_index(columns);
    var ws = {
        s: {
            "!row": [{ wpx: 67 }]
        }
    };
    //行次的距离设置
    ws['!cols'] = [];
    for (var n = 0; n != data[0].length; ++n) {
        if (rowIndexs && rowIndexs.length > 0 && rowIndexs.indexOf(n) != -1) {
            ws['!cols'].push({
                wpx: 80
            });
        } else {
            ws['!cols'].push({
                wpx: 170
            });
        }
    }
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
                    // s: {
                    //     // font: {
                    //     //     name: '宋体',
                    //     //     sz: 14,
                    //     //     color: { rgb: "#FFFF0000" },
                    //     //     bold: true,
                    //     //     italic: false,
                    //     //     underline: false
                    //     // },
                    //     // alignment: {
                    //     //     horizontal: "center",
                    //     //     vertical: "center"
                    //     // }
                    // }
            };
            // 如果正确代表为表头 否则为数据
            if (R < headNum) {
                cell.s = { 
                    font: { // 字体样式设置
                        name: '宋体',
                        sz: 14,
                        color: { rgb: "#fff000" },
                        bold: true
                    },
                    alignment: { // 是否居中center | 左对齐left | 右对齐right
                        horizontal: "center",
                        vertical: "center"
                    }
                };
            }else{
                cell.s = {
                    alignment: {
                        horizontal: "center",
                        vertical: "center"
                    }
                };
            }
            if (cell.v == null) continue;
            var cell_ref = XLSX2.utils.encode_cell({
                c: C,
                r: R
            });
            // debugger;
            var value = cell.v;
            if (C > 0 && (typeof(value) === 'string' || !isNaN(value))) {
                value = value + "";
                value = value.replace(/\,/g, "");
                if (!isNaN(value)) {
                    value = value - 0;
                    if (rowIndexs && rowIndexs.length > 0 && rowIndexs.indexOf(C) != -1) {
                        cell.s = {
                            alignment: {
                                horizontal: "center", //左右位置
                                vertical: "center" //上下位置
                            }
                        }
                    } else {
                        cell.s = {
                            alignment: {
                                horizontal: "center", //左右位置
                                vertical: "center" //上下位置
                            },
                            NumberFormatLocal: "#,##0.00"
                        }
                    }
                }
                if (value == "--") {
                    cell.s = {
                        alignment: {
                            horizontal: "right", //左右位置
                            vertical: "center" //上下位置
                        }
                    }
                }
                if((C == 2 && value.replace(/[\r\n]/g,"") == "未关闭") || (C == 3 && value.replace(/[\r\n]/g,"") == "未提交")){
                    cell.s = { 
                        font: { // 字体样式设置
                            name: '宋体',
                            sz: 14,
                            bold: true
                        },
                        // fill: { fgColor: { rgb: "33000000"}},
                        alignment: { // 是否居中center | 左对齐left | 右对齐right
                            horizontal: "center",
                            vertical: "center"
                        }
                    };
                }
            }
            // debugger
            //有些数没有格式化，没有保留两位小数。
            // if (typeof cell.v === 'number' && C > 0) {
            //     if (rowIndexs && rowIndexs.length > 0 && rowIndexs.indexOf(C) != -1) {} else {
            //         cell.v = cell.v.toFixed(2) + "";
            //     }
            // }
            if (typeof cell.v === 'number' && C > 0) cell.t = 'n';
            else if (typeof cell.v === 'boolean') cell.t = 'b';
            else if (cell.v instanceof Date) {
                cell.t = 'n';
                cell.z = XLSX2.SSF._table[14];
                cell.v = datenum(cell.v);
            } else cell.t = 's';

            // if (typeof cell.v === 'number') cell.t = 'n';
            // else if (typeof cell.v === 'boolean') cell.t = 'b';
            // else if (cell.v instanceof Date) {
            //     cell.t = 'n';
            //     cell.z = XLSX2.SSF._table[14];
            //     cell.v = datenum(cell.v);
            // } else cell.t = 's';

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
            // CellView cellView = new CellView();
            // ws.setAutoSize(true);
            // sheet.setColumnView(C, cellView);
        }
    }
    if (range.s.c < 10000000) ws['!ref'] = XLSX2.utils.encode_range(range);
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

export function export_table_to_excel(id, name, columns) { debugger
    // var theTable = document.getElementById(id);
    // 导出table
    var theTable = document.getElementById(id).getElementsByTagName("table");
    var oo = generateArray(theTable);
    var ranges = oo[1];

    /* original data */
    var data = oo[0];
    var ws_name = "SheetJS";
    var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data, oo[2], columns);

    /* add ranges to worksheet */
    // ws['!cols'] = ['apple', 'banan'];
    ws['!merges'] = ranges;

    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    var wbout = STYLEXLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
    });
    // ws['!cols'].EntireColumn.AutoFit();
    saveAs(new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
    }), (name ? name : "test") + ".xlsx")
}

export function export_json_to_excel({
    header,
    data,
    filename,
    autoWidth = true,
    bookType = 'xlsx'
} = {}) {
    /* original data */
    filename = filename || 'excel-list'
    data = [...data]
        // data.unshift(header);
    var ws_name = "SheetJS";
    var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data, Headers);

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

    var wbout = XLSX2.write(wb, {
        bookType: bookType,
        bookSST: false,
        type: 'binary'
    });
    saveAs(new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
    }), `${filename}.${bookType}`);
}