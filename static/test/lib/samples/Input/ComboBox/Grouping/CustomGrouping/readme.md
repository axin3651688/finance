Custom Grouping
================

You can create custom groups that are not based on the the content values bound to the control's __itemsSource__. To group by calculated values, override the **GroupDescription**'s **groupNameFromItem** method. This sample demonstrates this by creating a **GroupDescription** that returns the first letter of the name. This sample groups the data by initial.