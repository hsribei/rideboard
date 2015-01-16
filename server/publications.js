Meteor.publish('rides', function () {
  // Find only rides beginning in the last 24h. We don't show only the ones in
  // the future because people might need to refer to the ride details around
  // the time they're trying to meet each other.
  var d = new Date();
  d.setDate(d.getDate() - 1);
  return Rides.find({ departureTime: { $gte: d } },
    { sort: { departureTime: 1 } });
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
