const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const createJWT = async (payload = {}) => {
  const token = await jwt.sign(payload, 'Qwerty');
  return token;
};

/**
 * This function will verify jwt token created for user authentication
 * @property {string} token - user's jwt token
 * @returns {object} user's details object
 */

const verifyJWT = async (token) => {
  const tokenPayload = await jwt.verify(token, 'Qwerty');
  return tokenPayload;
};

async function generatePasswordHash(password) {
  const createSalt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, createSalt);
}

async function comparePasswordHash(password, hash) {
  return await bcrypt.compare(password, hash);
}

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes*.js'], // files containing annotations as above
};

module.exports = {
  createJWT,
  verifyJWT,
  options,
  generatePasswordHash,
  comparePasswordHash,
}