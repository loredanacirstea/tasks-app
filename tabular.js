TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.Tasks = new Tabular.Table({
  name: "Tasks",
  collection: Task,
  pub: "tabular_tasks",
  columns: [
    {data: "taskList", title: "Task List"},
    {data: "title", title: "Title"},
    {data: "description", title: "Description"},
    {data: "user", title: "User"},
    {data: "priority", title: "Priority"},
    {
      data: "deadline",
      title: "Deadline",
      render: function (val, type, doc) {
        if (val instanceof Date) {
          return moment(val).calendar();
        } else {
          return "Never";
        }
      }
    },
    {
        data: "image",
        title: "Snapshot",
        render: function(val, type, doc){
            return val.name;
        }
    },
    {tmpl: Meteor.isClient && Template.update_task},
    {tmpl: Meteor.isClient && Template.remove_task}
  ]
});

TabularTables.TaskList = new Tabular.Table({
    name: "TaskList",
    collection: TaskList,
    pub: "tabular_tasklist",
    columns: [
        {data: "title", title: "Task List"},
        {data: "user", title: "User"},
        {data: "roles", title: "Role"},
        {tmpl: Meteor.isClient && Template.update_tasklist},
        {tmpl: Meteor.isClient && Template.remove_tasklist}
    ]
});


TabularTables.UserList = new Tabular.Table({
    name: "UserList",
    collection: Meteor.users,
    pub: "users",
    columns: [
        {data: "profile", title: "First Name",
            render: function (val, type, doc) {
                return val.firstName;
            }
        },
        {data: "profile", title: "Last Name",
            render: function (val, type, doc) {
                return val.lastName;
            }
        },
        {data: "roles", title: "Role",
            render: function (val, type, doc) {
                return val.__global_roles__[0];
            }
        },
        {tmpl: Meteor.isClient && Template.update_user}, //&& Roles.userIsInRole(Meteor.userId(), 'admin')
        {tmpl: Meteor.isClient && Template.remove_user}
    ]
});
