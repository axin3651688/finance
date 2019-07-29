DataMaps
========

In many situations, you may want columns to map values so cells display a value that is different from what is actually stored in the grid. You could accomplish both tasks using the **formatItem** event, but the **FlexGrid** provides a better alternative: **DataMaps**. If you set a column's **dataMap** property to an instance of a **DataMap**, the grid will use it to look up display values for each data item, and provide a drop-down list with valid items when editing the cells.