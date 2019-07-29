Drop Target Control
===================

The column's **allowDragging** property provides control over the drag source (which columns may be dragged into new positions). You can get control over the drop target (the column's new position) by handling the **draggingColumnOver** event and setting the event's **cancel** parameter to true if the current source/target combination is invalid.