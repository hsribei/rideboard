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
