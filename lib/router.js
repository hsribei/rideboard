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
    var subscriptions = [];
    subscriptions.push(Meteor.subscribe('rides'));
    Tracker.autorun(function () {
      userIds = _(Rides.find({}, { userId: 1 }).fetch()).pluck('userId');
      subscriptions.push(Meteor.subscribe('users', userIds));
    });
    return [subscriptions];
  },
  data: function () {
    return Rides.find({}, { sort: { departureTime: 1 } });
  }
});

Router.route('/perfil', {
  name: 'profile'
});

Router.route('/inviteEmails', {
  name: 'inviteEmails'
});
