On-Demand Sorting
=================

The FlexGrid relies on the CollectionView class to perform data operations including sorting, filtering, grouping, paging, change tracking, etc. The CollectionView refreshes and re-sorts the data after any edits. This sample shows how you can override that behavior and sort the grid only when the user clicks a column header. Editing will not cause sort updates.