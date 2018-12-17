/*
 * @Author: cnbi.zhh 
 * @Date: 2018-12-11 17:34:38 
 * @Decription: element-ui table&paging 分页表格
 * @Last Modified by: cnbi.zhh
 * @Last Modified time: 2018-12-13 14:24:22
 */
import { Table, Pagination } from 'element-ui';
import Vue from 'vue';
export default {
    name: 'ExTable',
    mixins: [Table],
    props: {
        showPagination: {
            type: Boolean,
            default: true
        },
        pager_layout: {
            type: String,
            default: 'total,sizes,prev, pager, next, jumper'
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pageSizes: {
            type: Array,
            default: () => [10, 25, 50, 100]
        },
        searchMethod: {
            type: Function,
            default: () => { }
        }
    },
    data() {
        return {
            pagination: null
        }
    },
    methods: {
        setCurrentPage(page) {
            this.pagination.currentPage = page;
            this.fetchData();
        },
        setPageSize(size) {
            this.pagination.pageSize = size;
            if (this.pagination.currentPage === 1) {
                this.fetchData();
            } else {
                this.pagination.currentPage = 1;
            }
        },
        fetchData() {
            this.searchMethod(this.pagination, {
                currentPage: this.pagination.currentPage,
                pageSize: this.pagination.pageSize
            });
        },
        mountPagination() {
            const container = document.createElement('div');
            const parent = this.$el.parentNode;
            if (parent.lastChild == this.$el) {
                parent.appendChild(container);
            } else {
                parent.insertBefore(container, this.$el.nextSibling);
            }
            const Pager = Vue.extend(Pagination);
            this.pagination = new Pager({
                components: { Pagination },
                propsData: {
                    pageSize: this.pageSize,
                    pageSizes: this.pageSizes,
                    layout: this.pager_layout,
                    total: 0,
                    currentPage: 1
                }
            });
            this.pagination.$on('current-change', this.setCurrentPage);
            this.pagination.$on('size-change', this.setPageSize);
            this.pagination.$mount(container);
        }
    },
    mounted() {
        if (this.showPagination) {
            this.mountPagination();
        }
    },
    beforeDestroy() {
        this.pagination.$off('current-change', this.setCurrentPage);
        this.pagination.$off('size-change', this.setPageSize);
    }
}


