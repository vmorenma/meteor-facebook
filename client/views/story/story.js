Template.story.events({
    'click .like':function(e) {
        e.preventDefault();
        var story = Blaze.getData(e.currentTarget);
        var liker = Meteor.user();
        var likeData = {name: liker.profile.firstname + " " + liker.profile.lastname};
        var alreadyLiked = _.findWhere(story.likes, likeData);
        if(!alreadyLiked){
            Stories.update({_id: story._id}, {$push:{likes: likeData}});
        } else {
            Stories.update({_id: story._id}, {$pull:{likes:likeData}});
        }
    },
    'submit #comentForm': function(e){
      e.preventDefault();
      var story = Blaze.getData(e.currentTarget);
      var usuario = Meteor.user();
      var comentario=$("input[name='comentText']").val();
      var coment={'text':comentario,'story':story._id,'creator': usuario._id,'fecha':new Date()};
      console.log(coment);
      Stories.update({_id:story._id},{$push:{comments:coment}});

  },
  'click .deletecoment': function(e){
      var comment = Blaze.getData(e.currentTarget);
      var story = comment.story;
      
      Stories.update({_id:story},{$pull:{comments:comment}});
  }
})

Template.story.helpers({
    status:function(){
        return this.createdFor === this.createdBy;
    },
    creatorThumbnail:function() {
        var creatorThumbnail = this.creatorThumbnail;
        return creatorThumbnail ? creatorThumbnail : null;
    },
    friendUsername:function(friend) {
        var friendname = friend+'_name';
        Meteor.call('users.FriendName',friend, function(error, result) {
           Session.set(friendname,result);
           return result;
        });
        return Session.get(friendname);
    },
    friendPicture:function(friend) {
      var friendpic = friend+'_pic';
      var username =  Meteor.call('users.friendsrc',friend, function(error, result) {
                          Session.set(friendpic,result);
                      });

      return Session.get(friendpic);
    },
    comentOwner: function(comentownerid){
        var user= Meteor.user();
        if (user._id==comentownerid){
            return true;
        }
        return false;
    },
    likeCount:function(storyId){
        var story = Stories.findOne({_id: storyId});
        var likes = story.likes;
        if(!likes.length) {
            return "Nobody has liked this post yet.";
        } else if(likes.length <= 3) {
            var string = "";
            switch (likes.length) {
                case 1:
                    return likes[0].name + " likes this";
                    break;
                case 2:
                    return likes[0].name + " and " + likes[1].name + " like this";
                    break;
                case 3:
                    return likes[0].name + ", " + likes[1].name + " and " + likes[2].name + " like this";
                break;
            }

        } else {
            var correctLength = likes.length - 3;
            var correctOther;
            if(correctLength === 1) {
                correctOther = " other person likes this";
            } else {
                correctOther = " other people like this";
            }
            return likes[0].name + ", " + likes[1].name + ", " + likes[2].name + " and " + correctLength + correctOther;
        }

    }
})
