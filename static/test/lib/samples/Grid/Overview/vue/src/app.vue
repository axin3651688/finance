<template>
    <div class="container-fluid">
        <!-- search box -->
        <div class="row">
            <div class="col-md-6 col-xs-4">
                <input
                    type="text"
                    class="form-control app-pad"
                    placeholder="Filter"
                    v-model="filter"
                >
            </div>
            <div class="col-md-6 col-xs-8">
                <div class="pull-right wj-control wj-content wj-pager">
                    <div class="wj-input-group">
                        <span class="wj-input-group-btn">
                            <button id="first" class="wj-btn wj-btn-default" type="button">
                                <span class="wj-glyph-left" style="margin-right:-4px"></span>
                                <span class="wj-glyph-left"></span>
                            </button>
                        </span>
                        <span class="wj-input-group-btn">
                            <button id="previous" class="wj-btn wj-btn-default" type="button">
                                <span class="wj-glyph-left"></span>
                            </button>
                        </span>
                        <input id="inputCurrent" type="text" class="wj-form-control" disabled>
                        <span class="wj-input-group-btn">
                            <button id="next" class="wj-btn wj-btn-default" type="button">
                                <span class="wj-glyph-right"></span>
                            </button>
                        </span>
                        <span class="wj-input-group-btn">
                            <button id="last" class="wj-btn wj-btn-default" type="button">
                                <span class="wj-glyph-right"></span>
                                <span class="wj-glyph-right" style="margin-left:-4px"></span>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- the grid -->
        <wj-flex-grid
            :initialized="initialized"
            class="grid"
            :itemsSourceChanged="itemsSourceChangedHandler"
            :allowResizing="'Both'"
            :allowMerging="'All'"
            :stickyHeaders="true"
        ></wj-flex-grid>

        <!-- commands -->
        <div class="well">
            <div class="grid-sort-group">
                <!-- current selection -->
                <p>
                    Selection:
                    <b>{{selection}}</b>
                </p>

                <!-- data size -->
                <wj-menu
                    :header="'Items'"
                    :itemsSource="itemCountSource"
                    :displayMemberPath="'header'"
                    :selectedValuePath="'value'"
                    :selectedIndexChanged="selectedIndexChanged.bind(this,'itemCount')"
                    :initialized="initMenu.bind(this,'itemCount')"
                ></wj-menu>

                <!-- allow add new -->
                <wj-menu
                    :header="'Allow Add'"
                    :itemsSource="addNewRowSource"
                    :displayMemberPath="'header'"
                    :selectedValuePath="'value'"
                    :selectedIndexChanged="selectedIndexChanged.bind(this,'allowAddNew')"
                    :initialized="initMenu.bind(this,'allowAddNew')"
                ></wj-menu>

                <!-- selection mode -->
                <wj-menu
                    :header="'Selection'"
                    :itemsSource="selectionModeSource"
                    :displayMemberPath="'header'"
                    :selectedValuePath="'value'"
                    :selectedIndexChanged="selectedIndexChanged.bind(this,'selectionMode')"
                    :initialized="initMenu.bind(this,'selectionMode')"
                ></wj-menu>

                <!-- headers visibility -->
                <wj-menu
                    :header="'Headers Visibility'"
                    :itemsSource="headersVisibilitySource"
                    :displayMemberPath="'header'"
                    :selectedValuePath="'value'"
                    :selectedIndexChanged="selectedIndexChanged.bind(this,'headersVisibility')"
                    :initialized="initMenu.bind(this,'headersVisibility')"
                ></wj-menu>

                <!-- highlight headers -->
                <wj-menu
                    :header="'Show Selected Headers'"
                    :itemsSource="howSelectedHeadersSource"
                    :displayMemberPath="'header'"
                    :selectedValuePath="'value'"
                    :selectedIndexChanged="selectedIndexChanged.bind(this,'showSelectedHeaders')"
                    :initialized="initMenu.bind(this,'showSelectedHeaders')"
                ></wj-menu>

                <!-- show marquee -->
                <wj-menu
                    :header="'Show Marquee'"
                    :itemsSource="showMarqueeSource"
                    :displayMemberPath="'header'"
                    :selectedValuePath="'value'"
                    :selectedIndexChanged="selectedIndexChanged.bind(this,'showMarquee')"
                    :initialized="initMenu.bind(this,'showMarquee')"
                ></wj-menu>

                <!-- data maps -->
                <wj-menu
                    :header="'Data Maps'"
                    :itemsSource="dataMapsSource"
                    :displayMemberPath="'header'"
                    :selectedValuePath="'value'"
                    :selectedIndexChanged="selectedIndexChanged.bind(this,'dataMaps')"
                    :initialized="initMenu.bind(this,'dataMaps')"
                ></wj-menu>

                <!-- formatting -->
                <wj-menu
                    :header="'Formatting'"
                    :itemsSource="formattingSource"
                    :displayMemberPath="'header'"
                    :selectedValuePath="'value'"
                    :selectedIndexChanged="selectedIndexChanged.bind(this,'formatting')"
                    :initialized="initMenu.bind(this,'formatting')"
                ></wj-menu>

                <br>
                <br>

                <!-- testing the object model -->
                <button class="btn btn-default" @click="toggleColumnVisibility()">Show/Hide Column</button>
                <button class="btn btn-default" @click="changeColumnSize()">Resize Column</button>
                <button class="btn btn-default" @click="toggleRowVisibility()">Show/Hide Row</button>
                <button class="btn btn-default" @click="changeRowSize()">Resize Row</button>
                <button class="btn btn-default" @click="changeDefaultRowSize()">Default Row Size</button>
                <button class="btn btn-default" @click="changeScrollPosition()">Scroll Position</button>
            </div>
        </div>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.grid";
import Vue from "vue";
import { getCountries, getProducts, getColors, getData } from "./data";
import "@grapecity/wijmo.vue2.grid";
import "@grapecity/wijmo.vue2.input";

new Vue({
    el: "#app",
    data: {
        itemCountField: 500,
        cultureField: "en",
        dataMapsField: true,
        formattingField: true,
        filterField: "",
        toFilterField: null,
        thisFilterFunctionField: null,
        groupByField: "",
        pageSizeField: 0,
        collectionViewField: null,
        selectionField: null,
        allowAddNewField: null,
        selectionModeField: null,
        headersVisibilityField: null,
        showSelectedHeadersField: null,
        showMarqueeField: null,
        itemCountSource: [
            { header: "5", value: 5 },
            { header: "50", value: 50 },
            { header: "500", value: 500 },
            { header: "5,000", value: 5000 },
            { header: "50,000", value: 50000 },
            { header: "100,000", value: 100000 },
            { header: "500,000", value: 500000 },
            { header: "1,000,000", value: 1000000 }
        ],
        addNewRowSource: [
            { header: "Yes", value: true },
            { header: "No", value: false }
        ],
        selectionModeSource: [
            { header: "None", value: wjcGrid.SelectionMode.None },
            { header: "Cell", value: wjcGrid.SelectionMode.Cell },
            { header: "CellRange", value: wjcGrid.SelectionMode.CellRange },
            { header: "Row", value: wjcGrid.SelectionMode.Row },
            { header: "RowRange", value: wjcGrid.SelectionMode.RowRange },
            { header: "ListBox", value: wjcGrid.SelectionMode.ListBox }
        ],
        headersVisibilitySource: [
            { header: "None", value: wjcGrid.HeadersVisibility.None },
            { header: "Column", value: wjcGrid.HeadersVisibility.Column },
            { header: "Row", value: wjcGrid.HeadersVisibility.Row },
            { header: "All", value: wjcGrid.HeadersVisibility.All }
        ],
        howSelectedHeadersSource: [
            { header: "None", value: wjcGrid.HeadersVisibility.None },
            { header: "Column", value: wjcGrid.HeadersVisibility.Column },
            { header: "Row", value: wjcGrid.HeadersVisibility.Row },
            { header: "All", value: wjcGrid.HeadersVisibility.All }
        ],
        showMarqueeSource: [
            { header: "On", value: true },
            { header: "Off", value: false }
        ],
        dataMapsSource: [
            { header: "On", value: true },
            { header: "Off", value: false }
        ],
        formattingSource: [
            { header: "On", value: true },
            { header: "Off", value: false }
        ]
    },
    methods: {
        initialized: function(flex) {
            this.flex = flex;
            this.collectionView = this.flex.collectionView;
            this.selection = this.flex.selection;
            this.allowAddNew = this.flex.allowAddNew;
            this.selectionMode = this.flex.selectionMode;
            this.headersVisibility = this.flex.headersVisibility;
            this.showSelectedHeaders = this.flex.showSelectedHeaders;
            this.showMarquee = this.flex.showMarquee;
            this.flex.select(new wjcGrid.CellRange(0, 0));
            this.flex.selectionChanged.addHandler((s, e) => {
                this.selection = e.range;
            });
            this.flex.itemsSource = getData(this.itemCount);
        },
        formatMenuHeader: function(menu) {
            let index = menu.header.indexOf(":");
            if (index !== -1) {
                menu.header =
                    menu.header.substring(0, menu.header.indexOf(":")) +
                    wjcCore.format(": <b>{header}</b>", menu.selectedItem);
            } else {
                menu.header =
                    menu.header +
                    wjcCore.format(": <b>{header}</b>", menu.selectedItem);
            }
        },
        // update data maps, formatting, paging now and when the itemsSource changes
        itemsSourceChangedHandler: function() {
            var flex = this.flex;
            if (!flex) {
                return;
            }

            // make columns 25% wider (for readability and to show how)
            for (var i = 0; i < flex.columns.length; i++) {
                flex.columns[i].width = flex.columns[i].renderSize * 1.25;
            }

            // update data maps and formatting
            this.updateDataMapSettings();

            // set page size on the grid's internal collectionView
            if (flex.collectionView && this.pageSize) {
                flex.collectionView.pageSize = this.pageSize;
            }
        },

        updateDataMapSettings: function() {
            this._updateDataMaps();
            this._updateFormatting();
        },

        toggleColumnVisibility: function() {
            var flex = this.flex;
            var col = flex.columns[0];
            col.visible = !col.visible;
        },
        changeColumnSize: function() {
            var flex = this.flex;
            var col = flex.columns[0];
            col.visible = true;
            col.width = col.width < 0 ? 60 : -1;
            col = flex.rowHeaders.columns[0];
            col.width = col.width < 0 ? 40 : -1;
        },
        toggleRowVisibility: function() {
            var flex = this.flex;
            var row = flex.rows[0];
            row.visible = !row.visible;
        },
        changeRowSize: function() {
            var flex = this.flex;
            var row = flex.rows[0];
            row.visible = true;
            row.height = row.height < 0 ? 80 : -1;
            row = flex.columnHeaders.rows[0];
            row.height = row.height < 0 ? 80 : -1;
        },
        changeDefaultRowSize: function() {
            var flex = this.flex;
            flex.rows.defaultSize = flex.rows.defaultSize == 28 ? 65 : 28;
        },
        changeScrollPosition: function() {
            var flex = this.flex;
            if (flex.scrollPosition.y == 0) {
                var sz = flex.scrollSize;
                flex.scrollPosition = new wjcCore.Point(
                    -sz.width / 2,
                    -sz.height / 2
                );
            } else {
                flex.scrollPosition = new wjcCore.Point(0, 0);
            }
        },

        // apply/remove data maps
        _updateDataMaps: function() {
            var flex = this.flex;
            if (flex) {
                var colCountry = flex.columns.getColumn("countryId");
                var colProduct = flex.columns.getColumn("productId");
                var colColor = flex.columns.getColumn("colorId");
                if (colCountry && colProduct && colColor) {
                    if (this.dataMaps == true) {
                        colCountry.showDropDown = true; // show drop-down for countries
                        colProduct.showDropDown = false; // don't show it for products
                        colColor.showDropDown = false; // or colors (just to show how)
                        colCountry.dataMap = this._buildDataMap(getCountries());
                        colProduct.dataMap = this._buildDataMap(getProducts());
                        colColor.dataMap = this._buildDataMap(getColors());
                    } else {
                        colCountry.dataMap = null;
                        colProduct.dataMap = null;
                        colColor.dataMap = null;
                    }
                }
            }
        },

        // build a data map from a string array using the indices as keys
        _buildDataMap: function(items) {
            var map = [];
            for (var i = 0; i < items.length; i++) {
                map.push({ key: i, value: items[i] });
            }
            return new wjcGrid.DataMap(map, "key", "value");
        },

        // apply/remove column formatting
        _updateFormatting: function() {
            var flex = this.flex;
            if (flex) {
                var fmt = this.formatting;
                this._setColumnFormat("amount", fmt ? "c" : null);
                this._setColumnFormat("amount2", fmt ? "c" : null);
                this._setColumnFormat("discount", fmt ? "p0" : null);
                this._setColumnFormat("start", fmt ? "MMM d yy" : null);
                this._setColumnFormat("end", fmt ? "HH:mm" : null);
            }
        },
        _setColumnFormat: function(name, format) {
            var col = this.flex.columns.getColumn(name);
            if (col) {
                col.format = format;
            }
        },

        _loadCultureInfo: function() {
            wjcCore.httpRequest(
                "bin/Devel/sources/cultures/wijmo.culture." +
                    this.culture +
                    ".js",
                {
                    dataType: "script",
                    success: xhr => {
                        eval(xhr.response);
                        wjcCore.Control.invalidateAll();
                    }
                }
            );
        },

        // ICollectionView filter function
        filterFieldFunction: function(item) {
            var f = this.filter;
            if (f && item) {
                // split string into terms to enable multi-field searches such as 'us gadget red'
                var terms = f.toUpperCase().split(" ");

                // look for any term in any string field
                for (var i = 0; i < terms.length; i++) {
                    var termFound = false;
                    for (var key in item) {
                        var value = item[key];
                        if (
                            wjcCore.isString(value) &&
                            value.toUpperCase().indexOf(terms[i]) > -1
                        ) {
                            termFound = true;
                            break;
                        }
                    }

                    // fail if any of the terms is not found
                    if (!termFound) {
                        return false;
                    }
                }
            }

            // include item in view
            return true;
        },

        // apply filter (applied on a 500 ms timeOut)
        _applyFilter: function() {
            if (this.toFilterField) {
                clearTimeout(this.toFilterField);
            }
            var self = this;
            this.toFilterField = setTimeout(function() {
                self.toFilterField = null;
                if (self.flex) {
                    var cv = self.flex.collectionView;
                    if (cv) {
                        if (cv.filter != self.filterFieldFunction) {
                            cv.filter = self.filterFieldFunction;
                        } else {
                            cv.refresh();
                        }
                    }
                }
            }, 500);
        },

        _applyGroupBy: function() {
            if (this.flex) {
                // get the collection view, start update
                var cv = this.flex.collectionView;
                cv.beginUpdate();

                // clear existing groups
                cv.groupDescriptions.clear();

                // add new groups
                var groupNames = this.groupBy.split("/"),
                    groupDesc;
                for (var i = 0; i < groupNames.length; i++) {
                    var propName = groupNames[i].toLowerCase();
                    if (propName == "amount") {
                        // group amounts in ranges
                        // (could use the mapping function to group countries into continents,
                        // names into initials, etc)
                        groupDesc = new wjcCore.PropertyGroupDescription(
                            propName,
                            function(item, prop) {
                                var value = item[prop];
                                if (value > 1000) return "Large Amounts";
                                if (value > 100) return "Medium Amounts";
                                if (value > 0) return "Small Amounts";
                                return "Negative";
                            }
                        );
                        cv.groupDescriptions.push(groupDesc);
                    } else if (propName) {
                        // group other properties by their specific values
                        groupDesc = new wjcCore.PropertyGroupDescription(
                            propName
                        );
                        cv.groupDescriptions.push(groupDesc);
                    }
                }

                // done updating
                cv.endUpdate();
            }
        },

        selectedIndexChanged: function(prop, s, e) {
            if (s.selectedIndex > -1) {
                this.formatMenuHeader(s);
                this[prop] = s.selectedValue;
            }
        },

        initEvent: function() {
            document.querySelector("#first").addEventListener("click", () => {
                this.flex.collectionView.moveCurrentToFirst();
                this.currentItemChanged();
            });

            document
                .querySelector("#previous")
                .addEventListener("click", () => {
                    this.flex.collectionView.moveCurrentToPrevious();
                    this.currentItemChanged();
                });

            document.querySelector("#next").addEventListener("click", () => {
                this.flex.collectionView.moveCurrentToNext();
                this.currentItemChanged();
            });

            document.querySelector("#last").addEventListener("click", () => {
                this.flex.collectionView.moveCurrentToLast();
                this.currentItemChanged();
            });
        },

        currentItemChanged: function() {
            let curr = wjcCore.format("{current:n0} / {count:n0}", {
                current: this.flex.collectionView.currentPosition + 1,
                count: this.flex.collectionView.items.length
            });
            document.querySelector("#inputCurrent").value = curr;
            if (this.flex.collectionView.currentPosition === 0) {
                document
                    .querySelector("#first")
                    .setAttribute("disabled", "true");
                document
                    .querySelector("#previous")
                    .setAttribute("disabled", "true");
            } else {
                document.querySelector("#first").removeAttribute("disabled");
                document.querySelector("#previous").removeAttribute("disabled");
            }
            if (
                this.flex.collectionView.currentPosition ===
                this.flex.collectionView.items.length - 1
            ) {
                document
                    .querySelector("#last")
                    .setAttribute("disabled", "true");
                document
                    .querySelector("#next")
                    .setAttribute("disabled", "true");
            } else {
                document.querySelector("#last").removeAttribute("disabled");
                document.querySelector("#next").removeAttribute("disabled");
            }
        },

        initMenu: function(type, s) {
            this.formatMenuHeader(s);
            switch (type) {
                case "itemCount":
                    s.selectedValue = this.itemCount;
                    return;
                case "allowAddNew":
                    s.selectedValue = this.allowAddNew;
                    return;
                case "selectionMode":
                    s.selectedValue = this.selectionMode;
                    return;
                case "headersVisibility":
                    s.selectedValue = this.headersVisibility;
                    return;
                case "showSelectedHeaders":
                    s.selectedValue = this.showSelectedHeaders;
                    return;
                case "showMarquee":
                    s.selectedValue = false;
                    return;
                case "dataMaps":
                    s.selectedValue = true;
                    return;
                case "formatting":
                    s.selectedValue = true;
                    return;
            }
        },

        filterFunction: function(item) {
            var f = this.filter;
            if (f && item) {
                // split string into terms to enable multi-field searches such as 'us gadget red'
                var terms = f.toUpperCase().split(" ");

                // look for any term in any string field
                for (var i = 0; i < terms.length; i++) {
                    var termFound = false;
                    for (var key in item) {
                        var value = item[key];
                        if (
                            wjcCore.isString(value) &&
                            value.toUpperCase().indexOf(terms[i]) > -1
                        ) {
                            termFound = true;
                            break;
                        }
                    }

                    // fail if any of the terms is not found
                    if (!termFound) {
                        return false;
                    }
                }
            }

            // include item in view
            return true;
        }
    },
    mounted: function() {
        this.initEvent();
        this.thisFilterFunction = this.filterFieldFunction.bind(this);
        this.flex.itemsSouce = getData(this.itemCount);
        if (this.flex) {
            this.updateDataMapSettings();
        }
        this.currentItemChanged();
    },
    computed: {
        collectionView: {
            get: function() {
                return this.collectionViewField;
            },
            set: function(value) {
                this.collectionViewField = value;
            }
        },
        selection: {
            get: function() {
                var value = this.selectionField;
                var rng = "";
                if (value instanceof wjcGrid.CellRange) {
                    rng = "(" + value.row + ";" + value.col + ")";
                    if (!value.isSingleCell) {
                        rng += "-(" + value.row2 + ";" + value.col2 + ")";
                    }
                }
                return rng;
            },
            set: function(value) {
                this.selectionField = value;
            }
        },
        allowAddNew: {
            get: function() {
                return this.allowAddNewField;
            },
            set: function(value) {
                this.allowAddNewField = value;
                if (this.flex) {
                    this.flex.allowAddNew = value;
                }
            }
        },
        selectionMode: {
            get: function() {
                return this.selectionModeField;
            },
            set: function(value) {
                this.selectionModeField = value;
                if (this.flex) {
                    this.flex.selectionMode = value;
                }
            }
        },
        headersVisibility: {
            get: function() {
                return this.headersVisibilityField;
            },
            set: function(value) {
                this.headersVisibilityField = value;
                if (this.flex) {
                    this.flex.headersVisibility = value;
                }
            }
        },
        showSelectedHeaders: {
            get: function() {
                return this.showSelectedHeadersField;
            },
            set: function(value) {
                this.showSelectedHeadersField = value;
                if (this.flex) {
                    this.flex.showSelectedHeaders = value;
                }
            }
        },
        showMarquee: {
            get: function() {
                return this.showMarqueeField;
            },
            set: function(value) {
                this.showMarqueeField = value;
                if (this.flex) {
                    this.flex.showMarquee = value;
                }
            }
        },
        itemCount: {
            get: function() {
                return this.itemCountField;
            },
            set: function(value) {
                if (this.itemCountField != value) {
                    this.itemCountField = value;
                    this.flex.itemsSource = getData(this.itemCount);
                    this.groupBy = "";
                    this.currentItemChanged();
                }
            }
        },
        dataMaps: {
            get: function() {
                return this.dataMapsField;
            },
            set: function(value) {
                if (this.dataMapsField != value) {
                    this.dataMapsField = value;
                    this._updateDataMaps();
                }
            }
        },
        formatting: {
            get: function() {
                return this.formattingField;
            },
            set: function(value) {
                if (this.formattingField != value) {
                    this.formattingField = value;
                    this._updateFormatting();
                }
            }
        },
        culture: {
            get: function() {
                return this.cultureField;
            },
            set: function(value) {
                if (this.cultureField != value) {
                    this.cultureField = value;
                    this._loadCultureInfo();
                }
            }
        },
        filter: {
            get: function() {
                return this.filterField;
            },
            set: function(value) {
                if (this.filterField != value) {
                    this.filterField = value;
                    this._applyFilter();
                }
            }
        },
        groupBy: {
            get: function() {
                return this.groupByField;
            },
            set: function(value) {
                if (this.groupByField != value) {
                    this.groupByField = value;
                    this._applyGroupBy();
                }
            }
        },
        pageSize: {
            get: function() {
                return this.pageSizeField;
            },
            set: function(value) {
                if (this.pageSizeField != value) {
                    this.pageSizeField = value;
                    if (this.flex) {
                        this.flex.collectionView.pageSize = value;
                    }
                }
            }
        }
    },
    updated:function(s,e){

    }
});
</script>

<style>
.wj-flexgrid {
    height: 400px;
    margin: 6px 0;
}

.grid-sort-group .wj-menu,
.grid-sort-group .btn {
    margin: 2px 2px 2px 0;
}
</style>