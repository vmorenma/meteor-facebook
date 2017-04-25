Router.route('/',{
    onBeforeAction:function(){
        if(!Meteor.userId()){
            this.redirect("login");
        } else {
            this.next();
        }
    },
    template:"facebook"
});

Router.route('/notifications',{
    template:"notifications"
});

Router.route('/register',{
    template:"register"
});

Router.route('/login',{
    template:"login"
});

Router.route('/profile/:username',{
    template:"profileFeed"
});
