Cell Notes
==========

This sample shows how you can add Excel-style cell notes to FlexGrid controls. The notes are specified in the data. The formatItem event is used to check if the cell has a note. If it does, the event handler adds a class to the cell element so it displays a note indicator on the upper right corner of the cell and attaches a tooltip to the element.