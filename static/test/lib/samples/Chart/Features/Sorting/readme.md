Sorting
======================

The FlexChart allows you to visualize tabular data as business charts. It provides a variety of options about how to present and interact with the data, including selection, zooming, drill-down, formatting, etc.

Like all Wijmo controls, the chart delegates all data-related tasks to the CollectionView class, so if you want to filter, sort, or group the data, you can do it using the CollectionView. It may be useful to think of the FlexChart as a special type of data grid, where columns are represented by series and rows are data points on the chart.

When you set the chart's **itemsSource** property to an array, or **ObservableArray**, the chart automatically creates a CollectionView instance to wrap the original array. This CollectionView is exposed by the **collectionView** property in case you want to access it.