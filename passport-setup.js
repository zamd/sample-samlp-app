const passport =require('passport'),
      WsFedSaml2Strategy = require('passport-wsfed-saml2').Strategy;

passport.serializeUser( (user,done)=> {
  done(null,user);
});

passport.deserializeUser( (user,done) =>{
  done(null,user);
});

const saml2 = new WsFedSaml2Strategy({
    protocol: 'samlp',
    realm: process.env.Auth0_Realm,
    session: true,
    identityProviderUrl: process.env.Auth0_SamlEndpoint,
    thumbprints: [process.env.Auth0_Thumprint]
}, function(profile, done){
  done(null,profile);
});

passport.use(saml2);