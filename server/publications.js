Meteor.publish('verifiedUsersCount', function () {
  Counts.publish(this, 'verifiedUsers', Meteor.users.find({ 'emails.0.verified': true}));
});
