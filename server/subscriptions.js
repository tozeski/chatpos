/**
* All chat rooms are public. Publish all of them.
*/
Meteor.publish('allRooms', function() {
    return Rooms.find();
});
/**
* Publish messages by room id.
*/
Meteor.publish('roomMessages', function(roomId) {
    return Messages.find({ room : roomId });
});
/**
* Publish room users by room id.
*/
Meteor.publish('roomUsers', function(roomId) {
    return RoomUsers.find({ room : roomId });
});

/**
* Allow messages to be added.
*/
Messages.allow({
    'insert' : function() {
        return true;
    }
});
/**
* Allow chat rooms to be added.
*/
Rooms.allow({
    'insert' : function() {
        return true;
    }
});
/**
* Allow room users to be added, updated and removed.
*/
RoomUsers.allow({
    'insert' : function() {
        return true;
    },
    'remove' : function() {
        return true;
    },
    'update' : function() {
        return true;
    }
});