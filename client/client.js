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

Template.tasks.events({
  'click .grid_img': function (event) {
      var src = $(event.currentTarget).attr('src');
      Session.set("image_src",src);
      $(".modal_image").modal('toggle');
      event.stopPropagation();
  }
});
