let Cnbi = {
    isEmpty: (v, allowBlank) => {
        return v === null || v === undefined || ((Array.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
    },
    isObject: (v) => {
        return v && typeof v == "object";
    },
    apply: (o, c, defaults) => {
        if (defaults) {
            Cnbi.apply(o, defaults);
        }
        if (o && c && typeof c == 'object') {
            for (var p in c) {
                o[p] = c[p];
            }
        }
        return o;
    },
    applyIf: (o, c) => {
        if (o) {
            for (var p in c) {
                if (Cnbi.isEmpty(o[p])) {
                    o[p] = c[p];
                }
            }
        }
        return o;
    },

    "cubeProperties": ["cubeId", "subject", "dimName", "fact", "dims", "groupBy", "sort", "showDims", "helpDims", "unionDimName"],
    /**
     * 瀵硅薄灞炴€ф嫹璐�
     */
    copyDatas(target, obj) {
        Cnbi.cubeProperties.forEach(prop => {
            if (obj[prop]) {
                target[prop] = obj[prop];
            }
        });
    },
    copyDatasIf(target, obj) {
        Cnbi.cubeProperties.forEach(prop => {
            if (obj[prop]) {
                if (!target[prop]) {
                    target[prop] = obj[prop];
                } else {
                    Cnbi.copyDatasIf(target[prop], obj[prop]);
                }
            }
        });
    },
    /**
     * 璁剧疆鍒楅」鐩暟鎹�
     */
    setFactParams(columns) {
        let arr = [];
        columns.filter(item => {
            if (!item.ignore && item.type === "decimal" && item.id) {
                arr.push(item.id);
            }
        });
        return arr.join(",");
    },

    varReplace(id, params) {
        if (id.indexOf("{") != -1) {
            let start = id.lastIndexOf("{"),
                limit = id.lastIndexOf("}");
            let ss = id.substring(start + 1, limit);
            id = id.replace(id.substring(start, limit + 1), params[ss]);
        }
        return id;
    },
    /**
     * 璁剧疆琛岄」鐩暟鎹�
     */
    setItemParams(rows, params) {
        let arr = [];
        rows.filter(item => {
            if (!item.ignore && item.id) {
                item.idAfter = Cnbi.varReplace(item.id + "", params);
                arr.push(item.idAfter);
            }

        });
        return arr.join(",");
    },
    paramsHandler(config, params) {
        Cnbi.copyDatas(params, config);
        if (config.cube && Object.keys(config.cube).length > 0) {
            let tempDims = config.cube.dims;
            if (tempDims && params.dims) {
                Cnbi.applyIf(config.cube.dims, params.dims);
            }
            Cnbi.copyDatas(params, config.cube);

        }
        let mainDim = config.mainDim;
        if (!mainDim) {
            throw new Error("娌℃湁閰嶅埗琛屼富缁村害銆恗ainDim銆戜俊鎭紒");
        }
        if (!params.dims) {
            params.dims = {};
        }
        if (!params.dims[mainDim]) { //濡傛灉鍙傛暟閲屾病鏈変富缁村害淇℃伅锛屽氨浠巖ows閲岀敓鎴�
            params.dims[mainDim] = this.setItemParams(config.rows, params);
        }
        if (!params.fact) { //濡傛灉鍙傛暟閲屾病鏈変富搴﹂噺淇℃伅锛屽氨浠巆olumns閲岀敓鎴�
            params.fact = this.setFactParams(config.columns);
        }
    },
};

//澹版槑----濡傛灉鏈夋 contains 鐩存帴鐢ㄦ渶濂�
Array.prototype.contains = function (needle) {
    for (i in this) {
        if (this[i] == needle) return true;
    }
    return false;
}