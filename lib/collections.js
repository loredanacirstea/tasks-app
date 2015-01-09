Task = new Meteor.Collection("task");
TaskList = new Mongo.Collection("taskList");


Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {})]
});

