Accounts.onCreateUser(function(info, user) {
    if(info.email == 'ionut.titei@east-wolf.com' || info.email == 'office@east-wolf.com' || info.email == 'mihai.constantinescu@east-wolf.com' || info.email == 'loredana.cirstea@gmail.com'){
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