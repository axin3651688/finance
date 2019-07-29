Multiple Axes
==========

Most charts have two axes, X and Y. This works well as long as all the data on the chart has the same nature and can share the same scale.

But some charts contain series that show different types of data, with different units and scales. The chart below has two series that represent amounts (sales and expenses) and one that represents quantities (downloads).

Plotting all the series against a single Y axis squeezes the first two series against the bottom of the chart.

The easiest way to solve this problem and still using a single chart is to create a secondary Y axis and assign it to the **axisY** property of the "Downloads" series.