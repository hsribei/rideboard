// Template.profile.events({
//   'click .update-profile': function () {
//     Router.go('home');
//   }
// });

AutoForm.addHooks(null, {
  // Called when any operation succeeds, where operation will be
  // "insert", "update", "submit", or the method name.
  onSuccess: function (operation, result, template) {
    $('#successAlert') && $('#successAlert').show();
    return true;
  }
});
