Meteor.publish('rides', function () {
  return Rides.find({}, { sort: { departureTime: 1 } });
});

Meteor.publish('users', function (ids) {
  return Meteor.users.find({ _id: { $in: ids } });
});

Meteor.publish('verifiedUsersCount', function () {
  Counts.publish(this, 'verifiedUsers', Meteor.users.find({ 'emails.0.verified': true}));
});

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, { fields: {
      'profile': 1,
      'isAdmin': 1
    } });
  } else {
    this.ready();
  }
});
