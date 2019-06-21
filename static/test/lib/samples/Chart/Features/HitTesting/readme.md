Chart Elements and Hit-Testing
==============================

The FlexChart is composed of elements that can be customized using its object model. The elements are:

*   **PlotArea**: The area within the axes.
*   **ChartArea**: The area within the control but outside the axes.
*   **Legend**: The chart legend, usually on the right of the plot area.
*   **Header**: The chart header, above the plot area.
*   **Footer**: The chart footer, below the plot area.
*   **AxisX**: The X-axis, usually horizontal.
*   **AxisY**: The Y-axis, usually vertical.
*   **Series**: A chart series.
*   **SeriesSymbol**: A symbol in a chart series.
*   **DataLabel**: A label attached to a data point.

You can use the **hitTest** method to determine what chart area is under the mouse.