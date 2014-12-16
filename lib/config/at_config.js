AccountsTemplates.configure({
  // Behaviour
  confirmPassword: true,
  enablePasswordChange: true,
  enforceEmailVerification: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: false,
  sendVerificationEmail: true,

  // Appearance
  showAddRemoveServices: false,
  showForgotPasswordLink: true,
  showLabels: true,
  showPlaceholders: true,

  // Client-side Validation
  continuousValidation: false,
  negativeFeedback: true,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true,

  // Privacy Policy and Terms of Use
  privacyUrl: 'privacy',
  termsUrl: 'terms-of-use',

  // Redirects
  homeRoutePath: '/',
  redirectTimeout: 4000,

  // Hooks
  // onLogoutHook: myLogoutFunc,
  // onSubmitHook: mySubmitFunc,

  // Texts
  texts: {
    button: {
      signUp: "Register Now!"
    },
    socialSignUp: "Register",
    socialIcons: {
      "meteor-developer": "fa fa-rocket"
    },
    title: {
      forgotPwd: "Recover Your Passwod"
    },
  },
});


_(['changePwd', 'enrollAccount', 'forgotPwd', 'resetPwd', 'signIn', 'signUp']).
each(function (routeCode) { AccountsTemplates.configureRoute(routeCode); });

Router.route('/sign-out', {
  name: 'signOut',
  onBeforeAction: AccountsTemplates.logout
});

if (Meteor.isServer) {
  Accounts.validateNewUser(function (user) {
    var re = new RegExp(Meteor.settings.public.site.emailValidationRegExp, 'i');
    var OK = re.exec(user.emails[0].address);
    if (OK) {
      return true;
    } else {
      throw new Meteor.Error(403,
        "Você precisa de um email @unicamp.br ou @xyz.unicamp.br (ex.: " +
        "@students.ic.unicamp.br, @ifi.unicamp.br, etc.)."
      );
    }
  });
}
