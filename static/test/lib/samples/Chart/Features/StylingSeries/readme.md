Styling Series
=============

The FlexChart automatically picks colors for each series based on a default palette, which you can override by setting the **palette** property.

You can also override the default style settings for each series by setting the **style** and **symbolStyle** properties of any series to an object that specifies SVG styling attributes, including fill, stroke, strokeThickness, and so on.

The Series.style property is an exception to the general rule that all styling in Wijmo is done through CSS. This is because many charts have dynamic series, which would be impossible to style in advance.