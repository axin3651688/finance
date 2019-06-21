Expense Report Export
=====================

This example exports a hierarchical array of data, containing employees' expenses, to an Excel xlsx file using the **Workbook.saveAsync** method.

The array contains items with employee data, wherein each employee item contains a child array with employee's expenses. The sample creates a Workbook instance representation of the xlsx file data. Then invoke the **Workbook.saveAsync** method to save it as an xlsx file on the local disk.

The created workbook contains a separate sheet for each employee, with employee's personal data and expenses table.