AutoComplete Filtering
======================

The AutoComplete control takes control of its source **collectionView** filtering in order to show only items that match what the user typed.

If you want to keep control of the filter, set the **itemsSource** property to your CollectionView's **items** property. The AutoComplete will create a new CollectionView for its internal use, and the original filtering will be preserved.

For example, the AutoComplete below uses a filtered CollectionView as its **itemsSource**. The filter remains active while searching for items as the user types: