import { Session } from 'meteor/session'

Template.notifications.onCreated(function(){

})

Template.notifications.events({
    'click .accept':function(e){
      var clickedUser = Blaze.getData(e.currentTarget);
      var userid = Meteor.user()._id;
      Meteor.call('users.acceptFriendRequest',userid,clickedUser);
    },
    'click .refuse':function(e){
         var clickedUser = Blaze.getData(e.currentTarget);
         var userid = Meteor.user()._id;
         Meteor.call('users.removeFriendRequest',userid,clickedUser);

    },
})

Template.notifications.helpers({
    friendRequests:function(){
        var user = Meteor.user();
        console.log(user);
        console.log(user.profile.pendingFriends);
        return user.profile.pendingFriends;
    },
    friendPicture:function(friend) {
      var friendpic = friend+'_pic';
      var username =  Meteor.call('users.friendsrc',friend, function(error, result) {
                          Session.set(friendpic,result);
                      });

      return Session.get(friendpic);
    },
    friendName:function(friend) {
        var user = Meteor.users.findOne({_id:friend});
        return user ? user.profile.name.first + " " + user.profile.name.last : null;
    },
    friendAddress:function(friend, address) {
        var user = Meteor.users.findOne({_id:friend});
        switch (address) {
            case 0:
                return user ? user.profile.location.street : "";
                break;
            case 1:
                return user ? user.profile.location.city + ", " + user.profile.location.state + " " + user.profile.location.zip : "";
                break;
        }
    },
    friendUsername:function(friend) {
      var friendname = friend+'_name';
      Meteor.call('users.FriendName',friend, function(error, result) {
         Session.set(friendname,result);
         return result;
      });
      return Session.get(friendname);
   }
    // friendUsername:function(friend) {
    //     var friendID = "'"+friend+"'";
    //     var username =  Meteor.call('users.FriendName',friend, function(error, result) {
    //         // 'result' is the method return value
    //         Session.set('result', serverResult);
    //         return result;
    //     });
    //     console.log("Estoy aquí"+username);
    //     return username;
    // }
})
