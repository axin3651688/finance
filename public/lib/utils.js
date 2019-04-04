var Cnbi = {
    isEmpty: function(v, allowBlank) {
        return v === null || v === undefined || ((Array.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false) || (Object.keys(v).length === 0);
    },
    isObject: function(v) {
        return v && typeof v == "object";
    },
    apply: function(o, c, defaults) {
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
    applyIf: function(o, c) {
        if (o) {
            for (var p in c) {
                if (Cnbi.isEmpty(o[p])) {
                    o[p] = c[p];
                }
            }
        }
        return o;
    },
    applyDeepIf: function(object, source) {
        if (object) {
            for (var p in source) {
                var data = object[p];
                if (Cnbi.isEmpty(data)) {
                    object[p] = source[p];
                }
                if (typeof(source[p]) === "object") {
                    Cnbi.applyDeepIf(object[p], source[p]);
                }
            }
        }
        return object;
    },

    "cubeProperties": ["cubeId", "subject", "dimName", "fact", "dims", "groupBy", "sort", "showDims", "helpDims", "unionDimName"],
    /**
     * 对象属性拷贝
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
     * 设置列项目数据
     */
    setFactParams(columns) {
        var arr = [];
        //  debugger;
        columns.filter(item => {
            if (!item.ignore && item.type === "decimal" && item.id) {
                var ss = (item.id + "").indexOf("_")
                if (ss == -1) {
                    arr.push(item.id);
                }

            }
        });
        return arr.join(",");
    },

    varReplace(id, params) {
        if (id.indexOf("{") != -1) {
            var start = id.lastIndexOf("{"),
                limit = id.lastIndexOf("}");
            var ss = id.substring(start + 1, limit);
            id = id.replace(id.substring(start, limit + 1), params[ss]);
        }
        return id;
    },
    /**
     * 设置行项目数据
     */
    setItemParams(rows, params) {
        var arr = [];
        rows.filter(item => {
            if (!item.ignore && item.id) {
                item.idAfter = Cnbi.varReplace(item.id + "", params);
                arr.push(item.idAfter);
                if (item.id_) {
                    arr.push(item.id_);
                }
            }

        });
        return arr.join(",");
    },
    paramsHandler(config, params) {
        Cnbi.copyDatas(params, config);
        if (config.cube && Object.keys(config.cube).length > 0) {
            var tempDims = config.cube.dims;
            if (tempDims && params.dims) {
                Cnbi.applyIf(config.cube.dims, params.dims);
            }
            Cnbi.copyDatas(params, config.cube);

        }
        var mainDim = config.mainDim;
        if (!mainDim) {
            throw new Error("没有配制行主维度【mainDim】信息！");
        }
        if (!params.dims) {
            params.dims = {};
        }
        if (!params.dims[mainDim]) { //如果参数里没有主维度信息，就从rows里生成
            params.dims[mainDim] = this.setItemParams(config.rows, params);
        }
        if (!params.fact) { //如果参数里没有主度量信息，就从columns里生成
            params.fact = this.setFactParams(config.columns);
        }
    },
    getDevice() {
        var agent = (navigator.deviceMemory || 2) + "@" + (navigator.connection ? navigator.connection.effectiveType : 2) + navigator.userAgent.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "");
        return agent;
    }


};

//声明----如果有此 contains 直接用最好
Array.prototype.contains = function(needle) {
    for (i in this) {
        if (this[i] == needle) return true;
    }
    return false;
}