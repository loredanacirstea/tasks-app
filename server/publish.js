Meteor.publish(null, function (){ 
  return Meteor.roles.find({})
});

Meteor.publish('images', function(){
    return Images.find();
});

Images.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});

Meteor.publish('users', function(){
    return Meteor.users.find();
});

Meteor.publish('tasks', function(){
    //if(Roles.userIsInRole(this.userId, 'admin'){
        return Task.find();
    //}
    //else{
    //}
});

Meteor.publish('tasklists', function(){
    return TaskList.find();
});

Meteor.publish('tabular_tasks', function (tableName, ids, fields) {
    check(tableName, String);
    check(ids, [String]);
    check(fields, Match.Optional(Object));
    /*
    if (!Roles.userIsInRole(this.userId, 'admin')) {
        return [];
    }
    */
    Publish.relations(this, Task.find({}), function (id, doc) {
        var userid = '';
        doc.taskList = this.changeParentDoc(TaskList.find({_id: doc.taskListId},{title:1, _id: 0}), function (id, doc){
                userid = doc.userId;
                return doc.title;
            }, 'taskList');
        doc.user = this.changeParentDoc(Meteor.users.find({_id: userid}), function (id, doc){
                var fullname = doc.profile.firstName + " " + doc.profile.lastName;
                return fullname;
            }, 'user');
        doc.image = this.changeParentDoc(Images.find({_id: doc.snapshot}), function (id, doc){
                return {name: doc.original.name, key: doc.copies.images.key};
        }, 'image');
        //doc.userRole = this.changeParentDoc(Roles.find())
      });
      return this.ready();
});

Meteor.publish('tabular_tasklist', function (tableName, ids, fields) {
    check(tableName, String);
    check(ids, [String]);
    check(fields, Match.Optional(Object));
    /*
    if (!Roles.userIsInRole(this.userId, 'admin')) {
        return [];
    }
    */
    Publish.relations(this, TaskList.find({}), function (id, doc) {
        doc.user = this.changeParentDoc(Meteor.users.find({_id: doc.userId}), function (id, doc){
                var fullname = doc.profile.firstName + " " + doc.profile.lastName;
                return fullname;
            }, 'user');
        doc.roles = Roles.getRolesForUser(doc.userId)[0];
      });
      return this.ready();
});