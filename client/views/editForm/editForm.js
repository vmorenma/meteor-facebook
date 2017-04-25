import { Meteor } from 'meteor/meteor';

Template.editForm.helpers({
    firstname:function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        return user ? user.profile.firstname: null;
    },
    lastname:function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        return user ? user.profile.lastname: null;
    },
    email:function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        return user ? user.emails[0].address: null;
    },
    street:function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        return user ? user.profile.location.street: null;
    },
    city:function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        return user ? user.profile.location.city: null;
    },
    state:function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        return user ? user.profile.location.state: null;
    },
    zip:function(){
        var username = Router.current().params.username;
        var user = Meteor.users.findOne({username:username});
        return user ? user.profile.location.zip: null;
    },
})

Template.editForm.events({
    'click .cancel':function(e){
        e.preventDefault();
        editing.set(!editing.get());
    },
    'submit #editForm':function(e){
        e.preventDefault();
        var id= Meteor.user()._id;
        var email = $("input[name='email']").val();
        var firstname = $("input[name='firstname']").val();
        var lastname = $("input[name='lastname']").val();
        var street = $("input[name='street']").val();
        var city = $("input[name='city']").val();
        var state = $("input[name='state']").val();
        var zip = $("input[name='zip']").val();
        try {
            if(!email.length) throw new Meteor.Error("need email", "You must have an email");
            if(!firstname.length) throw new Meteor.Error("need name", "You must input your first name");
            if(!lastname.length) throw new Meteor.Error("need lastname", "You must input your last name");
            if(!street.length) throw new Meteor.Error("need street", "You must input your last name");
            if(!city.length) throw new Meteor.Error("need city", "You must input your last name");
            if(!state.length) throw new Meteor.Error("need state", "You must input your last name");
            if(!zip.length) throw new Meteor.Error("need zip", "You must input your last name");

            Meteor.call('users.updateProfile',id,firstname,lastname,email,street,city,state,zip);
        } catch (e) {
            console.log(e);
        }
        editing.set(!editing.get());
    },
})
