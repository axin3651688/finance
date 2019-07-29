Series Picker
===================

You can easily implement a series-picker UI using the chart's **series** property, a **ListBox** control, and Wijmo's **showPopup** and **hidePopup** methods.

For example, the chart below starts with an auto-generated set of series. Click the gear icon at the top-left corner to show a **ListBox** where you can select the series you want to display.

Note that you can achieve a similar result by setting the chart's **legendToggle** property to true. Once you do that, the legend itself acts as a series picker: clicking any series name in the legend toggles its visibility.