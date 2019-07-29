Validation
==========

The FlexGrid helps with validation in several ways. **Automatic Type Coercion**, **Data Maps**, **Event-Based Validation** and **CollectionView-Based Validation**. The grid below demonstrates the three first items. It has a Country column with a data map that prevents users from entering invalid countries. The **cellEditEnding** event is used to ensure that the 'Sales' and 'Expenses' columns contain positive values.