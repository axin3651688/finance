export function generateSlipData(count) {
    let slipData = {}, items = [];
    for (let i = 0; i < count; i++) {
        let debtorAcc = Math.floor(5 * Math.random());
        let debtorType = 0;
        let debtorAmt = Math.round(10000 * Math.random());
        let creditorAcc = Math.floor(4 * Math.random());
        let creditorType = Math.floor(4 * Math.random());
        let creditorAmt = Math.round(10000 * Math.random());
        items.push({
            debtorAcc: debtorAcc,
            debtorType: debtorType,
            debtorAmt: debtorAmt,
            debtorTax: debtorAmt * 0.09,
            creditorAcc: creditorAcc,
            creditorType: creditorType,
            creditorAmt: creditorAmt,
            creditorTax: creditorAmt * 0.09,
            brief: '',
            note: '',
            debtorTaxCategrory: '',
            creditorTaxCategory: ''
        });
    }
    slipData.items = items;
    slipData.date = new Date();
    slipData.slipNo = 's128';
    slipData.settlement = 'Normal';
    return slipData;
}
