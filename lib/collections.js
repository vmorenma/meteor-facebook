Stories = new Mongo.Collection("stories");
Stories.allow({
    insert:function(userId, doc) {
        return !!userId;
    },
    update:function(userId, doc) {
        return !!userId;
    }
});
