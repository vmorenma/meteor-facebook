Template.modal.events({
    'click .new-post': function (e) {
      e.preventDefault();
      var currentUser = Meteor.user();
      var story="";
      var story = $('#modaltextid').val();
      if(story.length) {
          Stories.insert({
              createdBy: currentUser._id, // the Meteor.userId()
              createdFor: currentUser._id, // the owner of the profile
              storyImage: null, // for the future we can add images in our story
              storyText: story, // the text that is the story
              creatorName: currentUser.profile.firstname + " " + currentUser.profile.lastname, // the creator
              creatorUsername: currentUser.profile.username, // so we can link to the creators profile
              creatorThumbnail: currentUser.profile.picture.thumbnail, // so we can have a picture in the story
              createdForName: currentUser.profile.firstname + " " + currentUser.profile.lastname, // the person recieving the post
              createdForUsername: currentUser.profile.username, // so we can link to the recievers profile
              createdForThumbnail: currentUser.profile.picture.thumbnail, // so we can see the recievers picture
              likes: [], // so we can see who's liked the post
              createdAt: new Date(), // good practice IMO
              comments: [] // comment array
          });
          $('textarea[name="new-post"]').val(""); // reset the text box when done
      }

    }
  });
