import { Session } from 'meteor/session';

Template.facebook.events({
    'click [data-toggle=offcanvas]':function(){
        $(this).toggleClass('visible-xs text-center');
        $(this).find('i').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
        $('.row-offcanvas').toggleClass('active');
        $('#lg-menu').toggleClass('hidden-xs').toggleClass('visible-xs');
        $('#xs-menu').toggleClass('visible-xs').toggleClass('hidden-xs');
        $('#btnShow').toggle();
    },
    'click .new-post':function(e){
        e.preventDefault();
        var profileUser = Meteor.users.findOne({username:Meteor.user().username});
        var currentUser = Meteor.user();
        var story = $('textarea[name="new-post"]').val();
        if(story.length) {
            Stories.insert({
                createdBy: currentUser._id, // the Meteor.userId()
                createdFor: profileUser._id, // the owner of the profile
                storyImage: null, // for the future we can add images in our story
                storyText: story, // the text that is the story
                creatorName: currentUser.profile.firstname + " " + currentUser.profile.lastname, // the creator
                creatorUsername: currentUser.profile.username, // so we can link to the creators profile
                creatorThumbnail: currentUser.profile.picture.thumbnail, // so we can have a picture in the story
                createdForName: profileUser.profile.firstname + " " + profileUser.profile.lastname, // the person recieving the post
                createdForUsername: profileUser.profile.username, // so we can link to the recievers profile
                createdForThumbnail: profileUser.profile.picture.thumbnail, // so we can see the recievers picture
                likes: [], // so we can see who's liked the post
                createdAt: new Date(), // good practice IMO
                comments: [] // comment array
            });
            $('textarea[name="new-post"]').val(""); // reset the text box when done
        }

    }
});

Template.facebook.helpers({
    statusPlaceholder:function(){
        return "Update your status";
    }
});
