/**
 * 风险管控的报告风险批示。
 * @author szc 2019年5月17日11:50:50
 */

export default {
    methods: {
        /**
         * 风险报告的每一条的批示内容，添加上去。
         * @author szc 2019年5月28日20:02:13
         */
        instructionContent(param) {
            debugger
            let me = this,
                instructionsRpt = me.$store.instructionsRpt || [],
                contentDown = me.contentDown,
                instructionObj = contentDown.instructionObj;
            if (instructionsRpt && instructionsRpt.length > 0 && instructionObj) {
                let flag = false;
                for (let i = 0; i < instructionsRpt.length; i++) {
                    let item = instructionsRpt[i];
                    if (item.id == instructionObj.nrelateid) {
                        item[param] = me[param].toString();
                        break;
                    }
                    if (i == instructionsRpt.length - 1) {
                        flag = true;
                    }
                }
                if (flag) {
                    let obj = {
                        id: instructionObj.nrelateid,
                        instructionValues: me.instructionValues.join(','),
                        instruction: me.instruction
                    };
                    instructionsRpt.push(obj);
                }
                me.$store.instructionsRpt = instructionsRpt;
            } else if (instructionObj) {
                // me.createPropOfInstru("instructionsRpt");
                let obj = {
                    id: instructionObj.nrelateid,
                    instructionValues: me.instructionValues.join(','),
                    instruction: me.instruction
                };
                instructionsRpt.push(obj);
                me.$store.instructionsRpt = instructionsRpt;
            }
        },
        /**
         * 制造instructionRpt
         */
        createPropOfInstru(instructionsRpt) {
            let me = this,
                arr = [];
            me.$store[instructionsRpt] = arr;
        }
    }
}