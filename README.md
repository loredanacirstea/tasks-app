# tasks-app
Repository for a Meteor task management app http://tasks-app.meteor.com/

### Some of the known bugs/caveats:
* filtering is not yet implemented
* cannot update the role of the user (client/admin)
* does not show the picture in the task grid and one cannot view a full-dim picture yet
* fully reactive grid - after insert, reactivity is forced only in the client and not all values are retrieved correctly
* does not display error on insert/update with same username as someone else
* cannot update the email address
* remove empty columns from the update & remove buttons, when user is not admin
* only supports unique taskList for a task

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
