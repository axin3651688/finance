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
            let me = this,
                instructionsRpt = me.$store.instructionsRpt || [],
                contentDown = me.contentDown,
                instructionObj = contentDown;
            if (instructionsRpt && instructionsRpt.length > 0) {
                let flag = false;
                for (let i = 0; i < instructionObj.length; i++) {
                    let item = instructionObj[i];
                    if (item.id == instructionObj.nrelateid) {
                        item[param] = me[param];
                        break;
                    }
                    if (i == instructionObj.length - 1) {
                        flag = true;
                    }
                }
                if (flag) {
                    let obj = {
                        id: instructionObj.nrelateid,
                        instructionValues: me.instructionValues,
                        instruction: me.instruction
                    };
                    instructionObj.push(obj);
                }
                me.$store.instructionsRpt = instructionsRpt;
            } else {
                // me.createPropOfInstru("instructionsRpt");
                let obj = {
                    id: instructionObj.nrelateid,
                    instructionValues: me.instructionValues,
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
            debugger;
            let me = this,
                arr = [];
            me.$store[instructionsRpt] = arr;
        }
    }
}