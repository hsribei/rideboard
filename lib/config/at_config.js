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
  showLabels: false,
  showPlaceholders: true,

  // Client-side Validation
  continuousValidation: false,
  negativeFeedback: true,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true,

  // Privacy Policy and Terms of Use
  privacyUrl: 'https://www.facebook.com/groups/GrupoUnicamp/permalink/10152879705420446/',
  termsUrl: 'https://www.facebook.com/groups/GrupoUnicamp/permalink/10152879705420446/',

  // Redirects
  homeRoutePath: '/',
  redirectTimeout: 1000,

  // Hooks
  // onLogoutHook: myLogoutFunc,
  // onSubmitHook: mySubmitFunc,

  // Texts
  texts: {
    button: {
      signUp: "Fazer pré-cadastro"
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


_(['changePwd', 'enrollAccount', 'forgotPwd', 'resetPwd', 'verifyEmail',
  'signUp']).each(function (routeCode) {
      AccountsTemplates.configureRoute(routeCode);
  }
);

AccountsTemplates.configureRoute('signIn', {
  redirect: 'ridesList'
});

Router.route('/sign-out', {
  name: 'signOut',
  onBeforeAction: AccountsTemplates.logout
});

if (Meteor.isServer) {
  Accounts.validateNewUser(function (user) {
    var email = user.emails[0].address;
    var re = new RegExp(Meteor.settings.public.site.emailValidationRegExp, 'i');
    var OK = re.exec(email);
    if (OK) {
      if (
        // Check if user attempted to use Unicamp's DAC/Alumni email but got
        // it wrong.
        // Example: 012345@unicamp.br, j012345@unicamp.br, ra012345@unicamp.br
        /^[a-z]*\d{6}@unicamp.br$/i.exec(email) ||
        // Example: ra012345@dac.unicamp.br, 012345@dac.unicamp.br
        /@(dac|alumni).unicamp.br$/i.exec(email) &&
          ! /^[a-z]{1}\d{6}@/i.exec(email)
      ) {
        throw new Meteor.Error(403,
          "Endereços de email da DAC devem seguir o padrão primeira letra do " +
          "primeiro nome + RA (6 dígitos) @dac.unicamp.br. Se você é " +
          "ex-aluno(a), use @alumni.unicamp.br. Exemplos: " +
          "j123456@dac.unicamp.br, m654321@alumni.unicamp.br."
        );
      } else {
        return true;
      }
    } else {
      throw new Meteor.Error(403,
        "Você precisa de um email @unicamp.br ou @xyz.unicamp.br (ex.: " +
        "@dac.unicamp.br, @students.ic.unicamp.br, @ifi.unicamp.br, etc.)."
      );
    }
  });
}
