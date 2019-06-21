Selection Events
================

The FlexGrid's **selection** property returns a **CellRange** object that contains the range of selected cells. When the selection changes, the grid raises the **selectionChanging** and **selectionChanged** events. The grid below uses the **selectionChanged** event to show a summary of the data selected.