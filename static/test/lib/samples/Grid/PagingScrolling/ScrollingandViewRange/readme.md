Scrolling and ViewRange
=======================

When the user selects a cell using the mouse or keyboard, the FlexGrid automatically ensures it is visible by calling the **scrollIntoView** method. The **scrollIntoView** method causes the grid to scroll as needed so the requested cell is within the current **viewRange**. The grid will scroll the minimum amount needed to show the cell, so it may become visible at the top, middle, or bottom of the view range.