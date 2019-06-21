Tree Grids
==========

If your data items contain collections of child items, you may use the FlexGrid's **childItemsPath** to show the data as a tree. For example, consider a list of 'person' objects which have a 'children' property. The 'children' property contains an array of more person objects. This is sometimes called a _homogeneous_ hierarchy. The grid below was built by binding the grid to the top-level persons list and setting the **childItemsPath** property to 'children':