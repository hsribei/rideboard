Template.registerHelper('siteName', function () {
  return Meteor.settings.public.site.siteName || 'Rideboard';
});
