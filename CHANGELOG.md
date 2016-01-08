# [Changes]

## v0.1.14
* **bug-fixes
  * Fixed bug with touch manipulator and dnd-rect directive
* **

## v0.1.13
* **bug-fixes
  * Fixed a bug with the sequence of events call (leave -> enter -> over)
* **

## v0.1.12
* **bug-fixes
  * Fix bug with child elements of dnd-pointer-none
  * Fix bug with drag 'tempateUrl' elements
  * Toggle off angular.dnd.debug.mode
  * Implement angular.element.dndClosest instead angular.element.dndParent
* **

## v0.1.11
* **dnd-containment
  * **API BREAKING CHANGE!** implement dnd-containment instead dnd-container and restrictTheMovement options
* **

## v0.1.10
* **Draggable
  * **API BREAKING CHANGE!** handle - новая опция
* **Examples
  * Add new dnd-draggable example
* **

## v0.1.9

* **Draggable
  * **API BREAKING CHANGE!** restrictTheMovement переименован в restrictMovement
* **

* **Sortable
  * **API BREAKING CHANGE!** restrictTheMovement переименован в restrictMovement
* **

 * Implement IE 10+ supporting

## v0.1.7
* **Draggable helper
  * **API BREAKING CHANGE!** теперь у dnd-draggable-opts есть новое свойство helper - может принимать либо значение 'clone' либо какой либо шаблон по типу ng-include и т.п.
  * **API BREAKING CHANGE!** для большего соответствия действительности ns переименован в layer
  * **API BREAKING CHANGE!** в draggable-opts добавлено свойство restrictTheMovement[boolean] - позволяет включать либо отключать зависимость от dnd-container
* **
