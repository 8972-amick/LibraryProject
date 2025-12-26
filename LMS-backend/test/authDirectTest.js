import prisma from '../prismaClient.js';
import { registerUser, loginUser } from '../controllers/authControllers.js';

const makeReq = (body, user = null) => ({ body, user });
const makeRes = () => {
  let statusCode = 200;
  let payload = null;
  return {
    status(code) { statusCode = code; return this; },
    json(obj) { payload = obj; console.log('RESPONSE', statusCode, JSON.stringify(obj)); return this; },
    _get() { return { statusCode, payload }; }
  };
};

(async () => {
  try {
    await prisma.$connect();
    // cleanup
    await prisma.user.deleteMany({ where: { email: 'directtest@example.com' } });

    console.log('\n-- Registering user --');
    await registerUser(makeReq({ name: 'Direct Test', email: 'directtest@example.com', password: 'password123' }), makeRes());

    console.log('\n-- Logging in user --');
    await loginUser(makeReq({ email: 'directtest@example.com', password: 'password123' }), makeRes());

    // cleanup
    await prisma.user.deleteMany({ where: { email: 'directtest@example.com' } });
  } catch (err) {
    console.error('TEST ERROR', err);
  } finally {
    await prisma.$disconnect();
  }
})();