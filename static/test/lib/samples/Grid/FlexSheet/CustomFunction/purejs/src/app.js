import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
import * as wjFlexSheet from '@grapecity/wijmo.grid.sheet';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let customFuncSheet = new wjFlexSheet.FlexSheet('#customFuncSheet');
    customFuncSheet.addUnboundSheet('Custom Function', 20, 10);
    customFuncSheet.addUnboundSheet('Data', 20, 10);
    customFuncSheet.addFunction('customSumProduct', (...params) => {
        let result = 0, range1 = params[0], range2 = params[1];
        if (range1.length > 0 && range1.length === range2.length && range1[0].length === range2[0].length) {
            for (let i = 0; i < range1.length; i++) {
                for (let j = 0; j < range1[0].length; j++) {
                    result += range1[i][j] * range2[i][j];
                }
            }
        }
        return result;
    }, 'Custom SumProduct Function', 2, 2);
    customFuncSheet.unknownFunction.addHandler((sender, e) => {
        let result = '';
        if (e.params) {
            for (let i = 0; i < e.params.length; i++) {
                result += e.params[i];
            }
        }
        e.value = result;
    });
    customFuncSheet.deferUpdate(() => {
        for (let i = customFuncSheet.sheets.length - 1; i >= 0; i--) {
            customFuncSheet.sheets.selectedIndex = i;
            switch (customFuncSheet.sheets[i].name) {
                case 'Custom Function':
                    customFuncSheet.setCellData(0, 0, '=customSumProduct(Data!A1:B5, Data!B1:C5)');
                    customFuncSheet.setCellData(1, 0, '=customFunc(1, "B", 3)');
                    break;
                case 'Data':
                    for (let ri = 0; ri < customFuncSheet.rows.length; ri++) {
                        for (let ci = 0; ci < 3; ci++) {
                            customFuncSheet.setCellData(ri, ci, ri + ci);
                        }
                    }
                    break;
            }
        }
    });
}
