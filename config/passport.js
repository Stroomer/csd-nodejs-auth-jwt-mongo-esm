import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY   = fs.readFileSync(pathToKey, 'utf8');
const User      = mongoose.model('User');

const options   = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
};

const passportConfig = (passport) => {
    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        console.log(`jwt_payload: ${jwt_payload}`);
        User.findOne({_id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            // TODO: if(user.admin) ////////////////////////////    https://youtu.be/Ne0tLHm1juE?t=2298
            if (user) {
                console.log('USER');
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}

export { passportConfig };