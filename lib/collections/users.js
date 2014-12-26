Meteor.Schema = Meteor.Schema || {};

Meteor.Schema.UserProfile = new SimpleSchema({
  firstName: {
    type: String,
    label: 'Nome'
  },
  lastName: {
    type: String,
    label: 'Sobrenome',
    optional: true
  },
  phoneNumbers: {
    type: [String],
    label: 'Telefones, ex. (19) 987 654 321 (Operadora)'
  },
  facebookProfileUrl: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    label: 'Link para perfil do Facebook (opcional)',
    optional: true
  }
});

Meteor.Schema.User = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  emails: {
    type: [Object]
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: Meteor.Schema.UserProfile,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: false
  }
});
