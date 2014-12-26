var isOwner = function (userId, doc) {
  var user = Meteor.users.findOne(userId);
  var isOwner = user._id === doc.userId;
  return isOwner;
}

Rides.allow({
  insert: isOwner,
  update: function (userId, doc, fields, modifier) {
    return isOwner(userId, doc);
  },
  remove: function (userId, doc) {
    return isOwner(userId, doc);
  }
});

Meteor.methods({
  inviteEmails: function () {
    var url = Meteor.settings.dataUrls['inviteEmails'];
    // Expects a single-line text file with email addresses separated by "\n"
    var result = HTTP.get(url).content;
    var emails = result.trim().split("\n");
    var createdUserIds = [];
    _(emails).each(function (email) {
      // Find or create user
      var existingUser = Meteor.users.findOne({ "emails.address" : email });
      if (! existingUser) {
        var createdUserId = Accounts.createUser({ email: email });
        createdUserIds.push(createdUserId);
        Accounts.sendEnrollmentEmail(createdUserId);
      }
    });
    return createdUserIds.length;
  }
});
