Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'ridesList',
  waitOn: function () {
    return Meteor.subscribe('verifiedUsersCount');
  }
});
