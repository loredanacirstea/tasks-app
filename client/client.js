Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});
Template.registerHelper("log", function(opt){
  console.log(opt);
});

Meteor.subscribe('users');
Meteor.subscribe('tasks');
Meteor.subscribe('tasklists');
Meteor.subscribe('images');

Tracker.autorun(function (){
  var remove = TaskList.find({}).observeChanges({
      removed: function (id) {
          var tasks = Task.find({taskListId: id},{fields: {_id:1}}).fetch();
          var ids = [];
          for(t in tasks){
              ids.push(tasks[t]._id);
          }
          Meteor.call('delete_tasks', ids, function (error, result) {
              //console.log(error);
              //console.log(result);
          });
      }
  });
});

Tracker.autorun(function (){
  var remove = Meteor.users.find({}).observeChanges({
      removed: function (id) {
          var lists = TaskList.find({userId: id},{fields: {_id:1}}).fetch();
          var ids = [];
          for(t in lists){
              ids.push(lists[t]._id);
          }
          Meteor.call('delete_tasklists', ids, function (error, result) {
              //console.log(error);
              //console.log(result);
          });
      }
  });
});

Template.home.rendered = function(){
  $('li').removeClass("active");
  $('#li_tasks').attr("class","active");
  Blaze.render(Template.tasks, document.getElementById("content"));
}

Template.home.events({
    'click #li_tasks': function (event){
        $("#content").html('');
        $('li').removeClass("active");
        $('#li_tasks').attr("class","active");
        Blaze.render(Template.tasks, document.getElementById("content"));
    },
    'click #li_tasklists': function (event){
        $("#content").html('');
        $('li').removeClass("active");
        $('#li_tasklists').attr("class","active");
        Blaze.render(Template.tasklists, document.getElementById("content"));
    },
    'click #li_users': function (event){
        $("#content").html('');
        $('li').removeClass("active");
        $('#li_users').attr("class","active");
        Blaze.render(Template.users, document.getElementById("content"));
    },
});

AutoForm.addHooks(null, {
    after: {
      insert: function(error, result, template) {
          $('select').val($('select').val()).change();
      }
    }
});

Template.tasks.rendered = function(){
    Session.set("schema", "Task");
}

Template.tasks.events({
  'click .grid_img': function (event) {
      var src = $(event.currentTarget).attr('src');
      Session.set("image_src",src);
      $(".modal_image").modal('toggle');
      event.stopPropagation();
  }
});

Template.view_tasks.helpers({
  selector: function (){
    var select = Session.get("filter_selector");
    console.log(select);
    //var select = { "$and": [ { "taskListId":"JqW2cxsZAK6gudJZs" }, { "priority": "medium" } ] };
    return select;
  }
});