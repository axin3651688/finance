Dynamic Updates
===============

The FlexGrid updates all cells automatically when there are changes to its data source. If you have a data source where only a few items change frequently, it may be more efficient to update only the cells bound to items that have actually changed. The grid below uses the **formatItem** event to keep track of the cell elements for each data item. When the data changes, it updates only the cells affected rather than the whole grid.