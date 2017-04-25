Meteor.publish("userData", function(username){
    return Meteor.users.find({username:username});
});
Meteor.publish("profileStories", function(username){
    var user = Meteor.users.findOne({username:username}, {fields: {_id:1}});
    return Stories.find({createdFor: user._id});
});
