var ridesData = [
{
  title: 'Introducing Telescope',
  url: 'http://sachagreif.com/introducing-telescope/'
},
{
  title: 'Meteor',
  url: 'http://meteor.com'
},
{
  title: 'The Meteor Book',
  url: 'http://themeteorbook.com'
}
];

Template.ridesList.helpers({
  rides: ridesData
});
