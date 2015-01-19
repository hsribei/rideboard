Handlebars.registerHelper("formatDate", function (timestamp, format) {
  return moment(timestamp).format(format);
});

Handlebars.registerHelper("Meteor", Meteor);
Handlebars.registerHelper("Schema", Meteor.Schema);
Handlebars.registerHelper("userProfile", function () {
  return Meteor.user() && Meteor.user().profile;
});
Handlebars.registerHelper("userEmail", function (id) {
  var user = id ? Meteor.users.findOne(id) : Meteor.user();
  return user && user.emails[0].address;
});
Handlebars.registerHelper('Session',function(key){
  return Session.get(key);
});

/* Disable mousewheel and up/down arrows on number input fields */
Template.ridesList.events({
  'mousewheel .input-number–noSpinners': function (e) {
    e.preventDefault();
  },
  'click .update-ride': function () {
    console.log('')
    Session.set('editRideId', null);
  },
  'click .subscribable': function(e) {
    e.preventDefault();
    Meteor.call('subscribe');
  },
  'click .unsubscribable': function(e) {
    e.preventDefault();
    Meteor.call('unsubscribe');
  },
  'mouseenter .subscribed': function(e) {
    e.preventDefault();
    $(e.target).removeClass().
    addClass("unsubscribable btn btn-danger pull-right").
    html('<span class="glyphicon glyphicon-remove-circle"></span> Parar de assinar');
  },
  'mouseleave .unsubscribable': function(e) {
    e.preventDefault();
    $(e.target).removeClass().
    addClass("subscribed btn btn-default pull-right").
    html('<span class="glyphicon glyphicon-envelope"></span> Assinado');
  }
});

Template.ridesList.helpers({
  editRide: function () {
    return Rides.findOne(Session.get('editRideId'));
  }
});
