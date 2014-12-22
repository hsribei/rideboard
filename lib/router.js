Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'home',
  waitOn: function () {
    return Meteor.subscribe('verifiedUsersCount');
  },
  onBeforeAction: function () {
    if (Meteor.user()) {
      Router.go('ridesList');
    } else {
      this.next();
    }
  }
});

Router.route('/caronas', {
  name: 'ridesList',
  onBeforeAction: function () {
    if (! Meteor.user() && ! Meteor.loggingIn()) {
      Router.go('home');
    } else {
      this.next();
    }
  },
  waitOn: function () {
    var userIds = [];
    Tracker.autorun(function () {
      userIds = _(Rides.find({}, { userId: 1 }).fetch()).pluck('userId');
    });
    return [Meteor.subscribe('rides'), Meteor.subscribe('users', userIds)];
  },
  data: function () {
    return Rides.find({}, { sort: { departureTime: 1 } });
  }
});

Router.route('/perfil', {
  name: 'profile'
});
