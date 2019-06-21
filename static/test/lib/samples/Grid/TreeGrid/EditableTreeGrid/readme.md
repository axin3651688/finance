Editable Tree Grids
===================

If you use the FlexGrid's **childItemsPath** to show the data as a tree, the resulting grid will be read-only by default. This happens because every row in a tree is a **GroupRow**, and group rows are read-only by default. If you want your tree to be editable, handle the **loadedRows** event to set the **isReadOnly** property of every row to false.