Accounts.onCreateUser(function(info, user) {
    if(Meteor.users.find().count() == 0){
        var role = 'admin';
    }
    else{
        var role = 'client';
    }
    if(info.profile)
        user.profile = info.profile;
    else
        user.profile = {};

    if(info.profile.firstName == undefined)
        if(info.username)
            user.profile.firstName = info.username;
        else
            user.profile.firstName = info.email;

    user.profile.role = role;
    return user;
});

Accounts.onLogin(function (info) {
    if(info.user.roles == undefined || info.user.roles.__global_roles__[0] != info.user.profile.role){
        Roles.addUsersToRoles(info.user._id, info.user.profile.role, Roles.GLOBAL_GROUP);
    }
});