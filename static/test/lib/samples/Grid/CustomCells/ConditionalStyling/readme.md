Conditional Styling
===================

The FlexGrid provides a powerful infrastructure for binding cells to data and formatting the cells using CSS. But in some cases that may not be enough. In those situations, use the **formatItem** event to customize the style or the content presented in each cell. The grid below uses **formatItem** to calculate and format cells that show the difference between values in the current and previous items: