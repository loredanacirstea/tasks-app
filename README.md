# tasks-app
Repository for a Meteor task management app http://tasks-app.meteor.com/

### Some of the known bugs/caveats:
* After inserting/updating a task, some of the values are not correctly retrieved. This is because I did not normalize the databases and I use a joined collection for creating the grid. Also, updating values from another tab (Task List / Users) do not propagate reactively - refresh needed. These issues are solvable.
* Does not display error on insert/update with same username as someone else
* Remove empty columns from the update & remove buttons, when user is not admin

### Class Diagram

![Class Diagram](class_diagram.png)

### Packages used:
##### accounts

    $ meteor add accounts-password
    $ meteor add ian:accounts-ui-bootstrap-3
    $ meteor add alanning:roles

##### schema, forms, files

    $ meteor add aldeed:simple-schema
    $ meteor add aldeed:collection2
    $ meteor add aldeed:autoform
    $ meteor add yogiben:autoform-modals
    $ meteor add yogiben:autoform-file
    $ meteor add cfs:standard-packages
    $ meteor add cfs:filesystem

##### grid

    $ meteor add aldeed:tabular
    $ meteor add mrt:moment
    $ meteor add cottz:publish-with-relations

##### extra

    $ meteor add twbs:bootstrap
    $ meteor add iron:router
