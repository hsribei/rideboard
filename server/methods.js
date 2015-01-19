var isOwner = function (userId, doc) {
  var user = Meteor.users.findOne(userId);
  var isOwner = user._id === doc.userId;
  return isOwner;
}

Rides.allow({
  insert: isOwner,
  update: function (userId, doc, fields, modifier) {
    return isOwner(userId, doc);
  },
  remove: function (userId, doc) {
    return isOwner(userId, doc);
  }
});

Rides.after.insert(function (userId, doc) {
  var recipients = Meteor.users.find({ 'profile.isSubscribed': true }).fetch();
  var rideOwner = Meteor.users.findOne(doc.userId);
    var profile = rideOwner.profile;

  _(recipients).each(function (recipient) {
    var message = {
      from: "Mural de Caronas <contato@muraldecaronas.org>",
      to: recipient.emails[0].address,
      subject: "Nova carona " + doc.originAndDestination,
      text:
        "Olá, muralista!\n\n" +
        "Uma nova carona foi postada no sentido " + doc.originAndDestination + ". Confira os detalhes:\n\n" +
        "----------\n\n" +
        "Horário de partida: " + moment(doc.departureTime).tz('America/Sao_Paulo').format('LLLL z') + "\n\n" +
        "Número de assentos disponíveis: " + doc.availableSeats + "\n\n" +
        "Preço por assento: R$ " + doc.pricePerSeat + "\n\n" +
        "Informação adicional:\n\n" +
        doc.description + "\n\n" +
        "----------\n\n" +
        "Motorista: " + profile.firstName + " " + profile.lastName + "\n\n" +
        "Email (verificado): " + rideOwner.emails[0].address + "\n\n" +
        (profile.facebookProfileUrl ? "Facebook: " + profile.facebookProfileUrl + "\n\n": '') +
        "Telefones: " + _(profile.phoneNumbers).join(" || ") + "\n\n" +
        "----------\n\n" +
        "Para ver esta e outras caronas, visite o Mural:\n\nhttp://www.muraldecaronas.org\n\n" +
        "Obrigado pela preferência =)\n\n" +
        "Abs,\n\n" +
        "Mural de Caronas\n\n" +
        "Obs.: se não quiser mais receber estes emails, por favor descadastre-se aqui: http://www.muraldecaronas.org/perfil"
    }
    Email.send(message);
  });

});

Meteor.methods({
  inviteEmails: function () {
    var url = Meteor.settings.dataUrls['inviteEmails'];
    // Expects a single-line text file with email addresses separated by "\n"
    var result = HTTP.get(url).content;
    var emails = result.trim().split("\n");
    var createdUserIds = [];
    _(emails).each(function (email) {
      // Find or create user
      var existingUser = Meteor.users.findOne({ "emails.address" : email });
      if (! existingUser) {
        var createdUserId = Accounts.createUser({ email: email });
        createdUserIds.push(createdUserId);
        Accounts.sendEnrollmentEmail(createdUserId);
      }
    });
    return createdUserIds.length;
  },
  subscribe: function () {
    if (Meteor.userId()) {
      Meteor.users.update({ _id: Meteor.userId() },
    { $set: { 'profile.isSubscribed': true } });
    }
  },
  unsubscribe: function () {
    if (Meteor.userId()) {
      Meteor.users.update({ _id: Meteor.userId() },
    { $set: { 'profile.isSubscribed': false } });
  }
}

});
