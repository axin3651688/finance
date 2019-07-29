Workbook Viewer
===============

This sample implements a simple Excel workbook viewer that loads xlsx file content and displays it on the page.

The sample creates a Workbook instance, then loads an xlsx file content to the workbook instance using the **Workbook.load** method. After that, it walks through the content of the current workbook sheet provided by **WorkSheet** class, and creates an **HTML table** that visualizes the content.

The sample also creates tabs that allow switching between workbook sheets. It is implemented using the BootstrapJS tab-like styling of the **<li>** elements with the applied **ng-repeat** directive that iterates through the **Workbook.sheets** collection.