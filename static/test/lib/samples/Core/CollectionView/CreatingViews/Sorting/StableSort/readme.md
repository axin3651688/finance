Stable Sort
===========

The __CollectionView__ class has a **stableSort** property that allows you to keep the original sequence of items when sorting by any fields in the data objects. This sample creates a __CollectionView__ based on a list of items sorted by _Country_ and _ID_. If you sort the grid by any property (e.g. Active), items with the same sort property value will be sorted according to the original order (sorted by Country and ID).