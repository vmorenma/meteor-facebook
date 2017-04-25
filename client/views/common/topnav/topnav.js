// ----------------------------------------------------------------------------
// @Date:
// @author:
// @description: This is where top nav stuff happens
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Template Event Map
// ----------------------------------------------------------------------------
Template.topnav.events({
    'click .logout':function(){
        Meteor.logout(function(err){
            if(!err) {
                Router.go("/");
            }
        })
    }
});


// ----------------------------------------------------------------------------
// Template Helper Map
// ----------------------------------------------------------------------------
Template.topnav.helpers({
    fullname:function(user){
        return user ? user.profile.firstname + " " + user.profile.lastname : null;
    },
    friendRequestCount:function(user){
        return user.profile.pendingFriends.length;
    }
});
