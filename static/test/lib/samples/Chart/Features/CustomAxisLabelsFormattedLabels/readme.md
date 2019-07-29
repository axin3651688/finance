Custom Axis Labels
==================

The Axis class has an **itemFormatter** property that allows you to customize the content and appearance of specific labels along the axes.

If specified, the **itemFormatter** function takes two parameters:

1.  **engine**: The IRenderEngine object used for rendering the labels.
2.  **label**: An object that represents the label and has these properties:
    *   **value**: The value that the label represents.
    *   **text**: The text content of the label (usually the formatted value).
    *   **pos**: The position where the label will be rendered, in control coordinates.
    *   **cls**: A CSS class to be applied to the label element.