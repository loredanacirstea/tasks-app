TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);


TabularTables.Tasks = new Tabular.Table({
  name: "Tasks",
  collection: Task,
  pub: "tabular_tasks",
  columns: [
    {data: "taskListId", visible: false},
    {data: "taskList", title: "Task List"},
    {data: "title", title: "Title"},
    {data: "description", title: "Description"},
    {data: "userId", visible: false},
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
    {data: "snapshot", visible: false},
    {
        data: "image",
        title: "Snapshot",
        render: function(val, type, doc){
            if(val.src){
                var name = val.src.split("/");
                name = name[name.length-1];
            }
            else{
                var name = doc.title+"_"+doc.user;
            }
            return Blaze.toHTMLWithData(Template.render_image, {src: val.src, title: doc.title, htmlid: name});
        }
    },
    {
        data: "repetitions",
        title: "Repetitions"
    },
    {tmpl: Meteor.isClient && Template.operation_task}
  ]
});

TabularTables.TaskList = new Tabular.Table({
    name: "TaskList",
    collection: TaskList,
    pub: "tabular_tasklist",
    columns: [
        {data: "title", title: "Task List"},
        {data: "userId", visible: false},
        {data: "user", title: "User"},
        {data: "role", title: "Role"},
        {tmpl: Meteor.isClient && Template.operation_tasklist}
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
        {data: "profile", title: "Role",
            render: function (val, type, doc) {
                return val.role;
            }
        },
        {tmpl: Meteor.isClient && Template.operation_user}
    ]
});
