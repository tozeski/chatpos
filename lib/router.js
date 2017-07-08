Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading',
    waitOn: function () {
        return Meteor.subscribe('allRooms');
    }
});

Router.map(function () {

    this.route('home', {
        path: '/',
        template: 'home',
        redirectOnLogin: true
    });

    this.route('loginRedirectRoute', {
        action: function () {
            Router.go('/rooms');
        }
    });

    this.route('room', {
        path: '/room/:_id',
        template: 'room',
        loginRequired: 'home',
        onBeforeAction: function () {
            if (!Meteor.userId() || !this.params._id) {
                this.redirect('/');
            } else {
                this.next();
            }
        },
        waitOn: function () {
            return Meteor.subscribe('roomMessages', this.params._id);
        },
        data: function () {
            var roomMessages = Messages.find({ room: this.params._id }, { sort: { creation_date: 'desc' } });
            return {
                messages: roomMessages,
            }
        },
        action: function () {
            Session.set('roomId', this.params._id);
            var username = Session.get('userName');
            var roomid = this.params._id;
            roomuser = {
                user: username,
                room: roomid,
                away: false
            };
            var roomuserid = RoomUsers.insert(roomuser);
            Session.set('userRoomId', roomuserid);
            Meteor.subscribe('roomUsers', this.params._id);
            this.render();
        },
        onStop: function () {
            var roomUserId = Session.get('userRoomId');
            RoomUsers.remove({ _id: roomUserId });
            Session.set('roomId', null);
        }
    });

    this.route('rooms', {
        path: '/rooms',
        template: 'roomList',
        loginRequired: 'home',
        onBeforeAction: function () {
            if (!Meteor.userId()) {
                this.redirect('/');
            } else {
                this.next();
            }
        },
        action: function () {
            var username = Meteor.user().username;
            Session.set('userName', username);
            this.render();
        },
        data: function () {
            var roomsList = Rooms.find({}, { sort: { creation_date: 'desc' } });
            return {
                rooms: roomsList
            }
        }
    });
});