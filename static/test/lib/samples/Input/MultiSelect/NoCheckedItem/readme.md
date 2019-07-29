MultiSelect without $checked Property
==================================

The **MultiSelect** control requires a data member to determine whether items are selected. If one is not provided, the control adds a _$checked_ property to the data items. You can prevent this by creating a dedicated **itemsSource** that contains objects with two properties: the original item and the checked member.