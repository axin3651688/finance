Popups: Delete Rows with Ctrl+Delete
============================

### (Or Fn+Delete on Mac keyboards)

You can handle keyboard events in the FlexGrid by adding HTML event listeners to the grid's **hostElement**.

For example, the grid below listens to the 'keydown' event. If you press Ctrl+Delete, it shows a prompt and deletes the current row. Note that:

1.  The event listener is added with the **capture** parameter set to true, so it is called before the grid gets it, and
2.  The event handler calls the event's **preventDefault** method, so the grid does not handle the Delete key as it normally would.

Press Ctrl+Delete to remove the current row: