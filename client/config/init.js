Meteor.startup(function () {
  T9n.setLanguage('pt');

  Session.set('pageTitle',
    Meteor.settings.public.site.siteName || 'Rideboard');

  Tracker.autorun(function () {
    document.title = Session.get('pageTitle');
  });
});
