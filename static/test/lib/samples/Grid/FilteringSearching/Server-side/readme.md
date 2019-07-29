Server-Side Filtering
=====================

If you are loading data from an **OData** source with the **ODataCollectionView** class, the **FlexGridFilter** can provide server-side filtering automatically. Set the view's **sortOnServer** property to true and the **FlexGridFilter** will automatically convert your filter conditions into **OData** filter statements to be handled on the server.