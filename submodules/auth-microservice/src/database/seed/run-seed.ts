import { users } from '../data/test-data/users.js';
import seed from './seed.js';
import { db } from '../db.js'

const runSeed = () => {
  return seed(users).then(() => db.end());
};

runSeed();