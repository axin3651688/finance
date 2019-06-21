CollectionView Currency
=======================

The **CollectionView** has a **currentItem** property that identifies the item that is currently active. This property is used by all Wijmo controls that support binding to lists and selection. The sample below implements a simple master/detail screen. When users select a country from the **ComboBox**, the current item changes. This raises the **currentChanged** event which is used to update the elements that show the current item's details.