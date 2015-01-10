# tasks-app
Repository for a Meteor task management app http://tasks-app.meteor.com/

### Some of the known bugs/caveats:
* Fully reactive grid - after inserting a new task, reactivity is forced only in the client - should have server hook (not all values are retrieved correctly without refreshing/changing page). Also, updating values from another tab (Task List / Users) do not propagate reactively - refresh needed.
* Does not display error on insert/update with same username as someone else
* Remove empty columns from the update & remove buttons, when user is not admin

#### Packages used:
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
