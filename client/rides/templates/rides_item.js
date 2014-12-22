Template.ridesItem.helpers({
  ownerProfile: function () {
    var owner = Meteor.users.findOne(this.userId);
    return owner && owner.profile;
  },
  isOwner: function () {
    return this.userId === Meteor.userId();
  }
});
