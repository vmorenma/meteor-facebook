// ----------------------------------------------------------------------------
// @Date:
// @author:
// @description: This is where the user will login
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Template Event Map
// ----------------------------------------------------------------------------
Template.login.events({
    'submit #loginform':function(e){
        e.preventDefault();
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        Meteor.loginWithPassword(username,password, function(err){
            if(!err) {
                Router.go("/")
            }
        })
    }
})
