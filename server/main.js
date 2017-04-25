import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';



if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('users', function productsPublication() {
    return Users.find();
  });

}
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('feed', function() {
    return Stories.find({},{sort: {createdAt:-1}, limit:20});
  });
//   Meteor.publish("feed",function(){
//     var self = this;
//     var edges = UserEdges.find({$or: [{requester: self.userId},{requestee: self.userId}], status:"accepted"});
//     var edgeArr = edges.fetch();
//     var ids = [];
//     edgeArr.forEach(function(edge){
//         if(edge.requester === self.userId) {
//             ids.push(edge.requestee)
//         } else {
//             ids.push(edge.requester);
//         }
//     });
//     ids.push(self.userId);
//     return Stories.find({$or: [{createdBy: {$in: ids}}, {createdFor: {$in: ids}}]}, {sort: {createdAt:-1}, limit:20});
// })


}

Meteor.startup(() => {
  // code to run on server at startup

});
Meteor.methods({
  'users.sendFriendRequest'(currentUserId, targetUserId) {
    check(targetUserId, String);
    check(currentUserId, String);

    Meteor.users.update({'_id': targetUserId }, { $push: { 'profile.pendingFriends': currentUserId } });
  },
  'users.removeFriendRequest'(currentUserId, targetUserId){
    check(targetUserId, String);
    check(currentUserId, String);

    Meteor.users.update({'_id': currentUserId }, { $pull: { 'profile.pendingFriends': targetUserId } })
  },
  'stories.getStories'(userId){
    check(userId, String);
    var s=Meteor.stories.find();
    return s;
  },
  'users.acceptFriendRequest'(currentUserId, targetUserId){
    check(targetUserId, String);
    check(currentUserId, String);

    Meteor.users.update({'_id': currentUserId }, { $pull: { 'profile.pendingFriends': targetUserId } });
    Meteor.users.update({'_id': currentUserId }, { $push: { 'profile.confirmedFriends': targetUserId } });
    Meteor.users.update({'_id': targetUserId }, { $push: { 'profile.confirmedFriends': currentUserId } });
  },
  'users.FriendName'(friend) {

    var user = Meteor.users.findOne({'_id':friend});
    var username = user.profile.username;
    return username;
  },
  'users.friendsrc'(friend) {

    var user = Meteor.users.findOne({'_id':friend});
    var pic = user.profile.picture.medium;
    return pic;
  },
  'users.updateProfile'(id,firstname,lastname,email,street,city,state,zip){
    check(id, String);
    check(firstname, String);
    check(lastname, String);
    check(email, String);
    check(street, String);
    check(city, String);
    check(state, String);
    check(zip, String);

    Meteor.users.update({'_id': id }, { $set: {
                                          'profile.firstname': firstname ,
                                          'profile.lastname': lastname,
                                          'emails[0].address' : email,
                                          'profile.location.street': street,
                                          'profile.location.city': city,
                                          'profile.location.state': state,
                                          'profile.location.zip': zip
                                        }
    });


  }
});
