Accounts.onLogin(function (info) {
    if(info.user.roles == undefined){
        if(info.user.emails[0].address == 'ionut.titei@east-wolf.com' || info.user.emails[0].address == 'office@east-wolf.com' || info.user.emails[0].address == 'mihai.constantinescu@east-wolf.com' || info.user.emails[0].address == 'loredana.cirstea@gmail.com'){
            var role = 'admin';
        }
        else{
            var role = 'client';
        }
        Roles.addUsersToRoles(info.user._id, role, Roles.GLOBAL_GROUP);
    }
});