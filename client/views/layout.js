Template.layout.events = {
    'click #login-buttons-logout' : function(e) {
        e.preventDefault();
        this.redirect('/');
        Meteor.logout();
    }
}