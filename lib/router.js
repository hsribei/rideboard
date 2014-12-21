Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'home',
  waitOn: function () {
    return Meteor.subscribe('verifiedUsersCount');
  }
});

Router.route('/caronas', {
  name: 'ridesList'
});
