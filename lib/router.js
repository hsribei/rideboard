Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'ridesList',
  onBeforeAction: AccountsTemplates.ensureSignedIn
});
