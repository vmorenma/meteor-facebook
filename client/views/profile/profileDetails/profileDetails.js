import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

editing = new ReactiveVar(false);

Template.profileDetails.helpers({
    fullname:function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        return user ? user.profile.firstname + " " + user.profile.lastname : null;
    },
    profilePicture:function() {
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        return user ? user.profile.picture.large : null;
    },
    friendCount:function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        return user ? user.profile.confirmedFriends.length: 0;
    },
    friendPicture:function(friend) {
      var friendpic = friend+'_pic';
      var username =  Meteor.call('users.friendsrc',friend, function(error, result) {
                          Session.set(friendpic,result);
                      });

      return Session.get(friendpic);
    },
    friendUsername:function(friend) {
      var friendname = friend+'_name';
      Meteor.call('users.FriendName',friend, function(error, result) {
         Session.set(friendname,result);
         return result;
      });
      var username = Session.get(friendname);
      username.trim();
      return username;
   },
    newFriends:function(){
      var username = Router.current().params.username;
      var user = Meteor.users.findOne({username:username});
      return user.profile.confirmedFriends;
    },
    about:function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
                return user ? user.profile.location.street + " " +
                              user.profile.location.city + ", " + user.profile.location.state + " " +
                              user.profile.location.zip : "";
    },
    storyCount:function(){
        return 0;
    },

    isProfilePage: function(){
        var isCurrentProfile = false;
        var logedusername = Meteor.user().profile.username;
        var currentUserProfile= Router.current().params.username;
        if (logedusername==currentUserProfile){
            isCurrentProfile= true;
        }

        return isCurrentProfile;
    },
    alreadyFriends: function(){

        var alrdyfrnds = false;
        var currentUserProfile= Router.current().params.username;
        var cpuser = Meteor.users.findOne({username:username});
        var cpuserid = cpuser._id;
        var logeduser = Meteor.user();
        var logedusercurrentFriends = logeduser.profile.confirmedFriends;

        if(logedusercurrentFriends.indexOf(cpuserid)!=-1){
            alrdyfrnds = true;
        }else{
            alrdyfrnds = false;
        }
        return alrdyfrnds;
    },
    profile : function(){
      var profileUser = Meteor.users.findOne({username : Meteor.user.profile.username});
      return (profileUser.profile);
    }
});

Template.profileDetails.onCreated(function(){
    var self = this;
    var username = Router.current().params.username;
    self.autorun(function(){
        username = Router.current().params.username;
        self.subscribe("userData", username, {
            onReady:function(){
                var user = Meteor.users.findOne({username: username});
                if(!user) {
                    Router.go("/");
                }
            }
        });
    })

});



Template.profileDetails.events({
    'click .add-friend':function(){
        console.log('click');


        //Recuperamos en usuario logeado
        var currentUser=Meteor.user();
        var currentId = currentUser._id;
        //Recuperamos el usuario objetivo
        var targetUser = Meteor.users.findOne({username:Router.current().params.username});

        //Recuperamos los amigos pendientes y aceptados del usuario objetivo.
        var targetPending = targetUser.profile.pendingFriends;
        var targetConfirmed = targetUser.profile.confirmedFriends;

        if(((targetPending.indexOf(currentUser._id)==-1) && (targetConfirmed.indexOf(currentUser._id)==-1))  ){
          Meteor.call('users.sendFriendRequest',currentUser._id, targetUser._id);
        }
    },
    'click .editTime':function(){

        console.log(editing.get());
        editing.set(!editing.get());
        console.log(editing);

    }
})
