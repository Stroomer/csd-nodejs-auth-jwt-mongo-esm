import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
import fs from 'fs'; 
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY  = fs.readFileSync(pathToKey, 'utf8');

function validPassword(password, hash, salt) {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

function genPassword(password) {
    const salt    = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return { salt:salt, hash:genHash };
}

function issueJWT(user) {
  const _id         = user._id;
  const expiresIn   = '1d';
  const payload     = { sub:_id, iat:Date.now() };
  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
  return { token:"Bearer "+signedToken, expires:expiresIn };
}

export { validPassword, genPassword, issueJWT };