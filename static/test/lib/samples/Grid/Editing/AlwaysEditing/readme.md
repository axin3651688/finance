Custom Editing
==============

Although the FlexGrid provides efficient, Excel-style editing by default, you may want to customize the editing behavior in some cases. The simplest customization is making sure the grid is always in edit mode. This does not save the user any work, since they can edit by typing into cells at any time, but it does show users that the grid is editable. The easiest way to keep the grid in edit mode at all times is to call the **startEditing** method when the grid gets the focus and when the selection changes.