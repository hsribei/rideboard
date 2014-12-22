Rides.allow({
  // Insert callers: template `pollTapeSubmissionVerify`
  insert: function (userId, doc) {
    var user = Meteor.users.findOne(userId);
    var isOwner = user._id === doc.userId;
    return isOwner;
  }
});
