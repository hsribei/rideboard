Template.ridesItem.helpers({
  ownerProfile: function () {
    var owner = Meteor.users.findOne(this.userId);
    return owner && owner.profile;
  },
  isOwner: function () {
    return this.userId === Meteor.userId();
  }
});

Template.ridesItem.events({
  'click .edit-ride': function () {
    Session.set('editRideId', this._id);
  }
});

Template.ridesItem.helpers({
  beforeRemove: function () {
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Certeza que quer deletar essa carona?')) {
        this.remove();
      }
    };
  },
  hasUpdate: function () {
    // Don't show updatedAt if it's less than 10min after creation
    var timeDifference = this.updatedAt.getTime() - this.createdAt.getTime();
    return  timeDifference > 10*60*1000;
  }
});
