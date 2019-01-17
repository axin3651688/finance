import {
    apiItemDatas
} from 'utils/apiItemDatas'
import {
    findThirdPartData,
} from "~api/interface";
export default {
    methods: {
        fetchData(code) {
            var params = apiItemDatas(this.item, code)
            /**
             * 根据sql, params发请求
             */
            // console.log(params);
            debugger
            findThirdPartData(params)
                .then(res => {
                    console.log(res.data.data);
                    debugger
                    let data = res.data.data
                    let children = [];
                    this.$set(this.item.datas, children, data);
                    console.log(this.item.datas);

                    this.convertData(this.item.datas);
                })
                .catch(res => {
                    console.info(res);
                });
        },
        /**
         * 递归设置节点的孩子
         * @param  nodes   所有节点
         * @param  nodeId   节点编码
         * @param  children  节点的孩子
         */
        setTreeNodeChildren(nodes, nodeId, children) {
            if (!children) return;
            if (!nodes) nodes = this.leftMenus;
            nodes.forEach(node => {
                if (node.code == nodeId) {
                    node.children = children;
                } else if (node.leaf == 0) {
                    this.setTreeNodeChildren(node.children, nodeId, children);
                }
            });
        },
    }
}