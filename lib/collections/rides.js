Meteor.Schema = Meteor.Schema || {};

Rides = new Mongo.Collection("rides");

Meteor.Schema.Rides = new SimpleSchema({
  // Force value to be current date (on server) upon insert
  // and prevent updates thereafter.
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        return undefined;
      }
    }
  },
  // Force value to be current date (on server) upon update
  // and set it upon insert.
  updatedAt: {
    type: Date,
    autoValue: function () {
      var createdAt = this.field('createdAt');
      if (this.isInsert || this.isUpdate || this.isUpsert) {
        return createdAt.isSet ? createdAt.value : new Date();
      } else {
        return undefined;
      }
    }
  },

  // The verification's userId refers to the user who did the verification, not
  // the user who submitted the poll tape pictures.
  userId: {
    type: String,
    index: 1
  },
  originAndDestination: {
    type: String,
    allowedValues: ['Barão Geraldo => São Paulo', 'São Paulo => Barão Geraldo'],
    label: 'Origem => Destino'
  },
  departureTime: {
    type: Date,
    autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker",
        timezoneId: "America/Sao_Paulo"
      }
    },
    label: 'Data e horário de partida'
  },
  availableSeats: {
    type: Number,
    label: 'Número de assentos disponíveis'
  },
  pricePerSeat: {
    type: Number,
    label: 'Preço por assento (R$)'
  },
  description: {
    type: String,
    label: 'Mais detalhes sobre a carona',
    max: 350
  }
});

Rides.attachSchema(Meteor.Schema.Rides);
