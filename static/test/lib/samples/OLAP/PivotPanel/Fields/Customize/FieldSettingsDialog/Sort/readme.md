PivotEngine Sort Control
========================

The **PivotEngine** automatically sorts Dimension fields when it generates data summaries. It does not sort Measure fields by default. You can change the sort direction on row and column fields by setting the field's **sort** property in code. Measure fields are not sorted by default. You can set their sort direction by changing the **sortDescriptions** property of the engine's **pivotView** collection. This example shows how you can apply sorts to dimension and measure fields.