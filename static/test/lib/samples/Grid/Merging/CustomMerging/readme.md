Custom Merging
==============

By default, the FlexGrid applies merging to cells based on their content. In some cases, you may want to use different strategies for merging.You can achieve this by defining a class that extends the **wijmo.grid.MergeManager** class and assigning an object of that type to the grid's **mergeManager** property.