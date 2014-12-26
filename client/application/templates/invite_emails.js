Template.inviteEmails.events({
  'click .invite': function (e) {
    e.preventDefault();
    if (Meteor.userId()) {
      Meteor.call('inviteEmails');
    }
  }
});
