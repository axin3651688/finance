PivotGrid with Sparklines
====================

You can use the **formatItem** event to add custom content such as sparklines and sparkbars to grid cells. This example adds two extra fields to a **PivotEngine** and uses the **formatItem** event to add sparklines and sparkbars to the extra fields. The engine's **getDetail** method is also used retrieve the detail records for each cell and uses that data to build svg elements displayed in each cell.