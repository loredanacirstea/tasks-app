
var Schemas = {};

Schemas.Task = new SimpleSchema({
    taskListId: {
        type: String,
        label: 'Task List',
        autoform: {
          type: "select",
          options: function () {
            var list = TaskList.find().fetch();
            var option = [];
            for(u = 0; u < list.length ; u++){
                option.push({label: list[u].title, value: list[u]._id});
            }
            return option;
          }
        }
    },
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    description: {
        type: String,
        label: "Description",
        optional: true,
        autoform: {
          afFieldInput: {
            type: "textarea"
          }
        }
    },
    priority: {
        type: String,
        label: "Priority",
        allowedValues: ["low", "medium", "high"]
    },
    deadline: {
        type: Date,
        label: "Deadline"
    },
    snapshot: {
        type: String,
        label: "Snapshot",
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images'
            }
        }
    }
});

Task.attachSchema(Schemas.Task);

Schemas.TaskList = new SimpleSchema({
    userId: {
        type: String,
        label: 'User',
        autoform: {
          type: "select",
          options: function () {
            var users = Meteor.users.find().fetch();
            var option = [];
            for(u = 0; u < users.length ; u++){
                var fullname = users[u].profile.firstName + " " + users[u].profile.lastName;
                option.push({label: fullname, value: users[u]._id});
            }
            return option;
          }
        }
    },
    title: {
        type: String,
        label: "Title",
        max: 200
    }
});

TaskList.attachSchema(Schemas.TaskList);


Schemas.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        label: 'First Name',
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    lastName: {
        type: String,
        label: 'Last Name',
        regEx: /^[a-zA-Z]{2,25}$/,
        defaultValue: "EditProfile",
        optional: true
    },
    role: {
        type: String,
        label: 'Role',
        optional: true,
        autoform: {
          type: "select",
          options: function () {
            var option = {"client":"client","admin":"admin"};
            return option;
          }
        }
    }
});
Schemas.User = new SimpleSchema({
    username: {
        type: String,
        label: 'Username',
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    emails: {
        type: [Object],
        label: 'Email'
    },
    profile: {
        type: Schemas.UserProfile,
        optional: true
    },
    "emails.$.address": {
        type: String,
        label: 'Email',
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: Object,
        label: 'Role',
        blackbox: true,
        optional: true
    }
});

Meteor.users.attachSchema(Schemas.User);