import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { startServer, stopServer } from '../utils/server';
import errorCodes from '../../src/constants/errorCodes';
import factoriesUser from '../utils/factories/user';

const { describe, it, beforeAll, afterAll } = require('@jest/globals');
const instance = axios.create({
  baseURL: process.env.BASE_URL,
});
const {
  EMAIL_NOT_VALID,
  EMAIL_ALREADY_IN_USE,
  PASSWORD_NOT_VALID,
  PASSWORD_INVALID_LENGTH,
  USERNAME_ALREADY_IN_USE,
  USERNAME_NOT_VALID,
} = errorCodes;

let user;

describe('Auth API', () => {
  beforeAll(async () => {
    await startServer();
    user = await factoriesUser.create();
  });
  describe('POST /api/auth/register', () => {
    it('Should return an error for an empty body', async () => {
      const errorsAll = [
        EMAIL_NOT_VALID,
        EMAIL_NOT_VALID,
        PASSWORD_NOT_VALID,
        PASSWORD_INVALID_LENGTH,
        USERNAME_NOT_VALID,
      ];
      try {
        await instance.post('/api/auth/register', {});
      } catch (error) {
        const { data, status } = error.response;
        expect(status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
        errorsAll.forEach((error, index) => {
          expect(data.errors[index]).toHaveProperty('msg', error);
        });
      }
    });

    it('Should return an error if the username is not provided', async () => {
      try {
        await instance.post('/api/auth/register', {
          ...factoriesUser.getDataWithout({ missing: ['username'] }),
        });
      } catch (error) {
        const { data, status } = error.response;
        const [firstError, ...errors] = data.errors;
        expect(status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);

        expect(firstError).toHaveProperty('msg', USERNAME_NOT_VALID);
      }
    });

    it('Should return an error if the email is not provided', async () => {
      try {
        await instance.post('/api/auth/register', {
          ...factoriesUser.getDataWithout({ missing: ['email'] }),
        });
      } catch (error) {
        const { data, status } = error.response;
        const [firstError, ...errors] = data.errors;
        expect(status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);

        expect(firstError).toHaveProperty('msg', EMAIL_NOT_VALID);
      }
    });

    it('Should return an error if the password is not provided', async () => {
      try {
        await instance.post('/api/auth/register', {
          ...factoriesUser.getDataWithout({ missing: ['password'] }),
        });
      } catch (error) {
        const { data, status } = error.response;
        const [firstError, ...errors] = data.errors;
        expect(status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);

        expect(firstError).toHaveProperty('msg', PASSWORD_NOT_VALID);
      }
    });

    it('Should return an error for password length', async () => {
      try {
        await instance.post('/api/auth/register', {
          ...factoriesUser.getDataWithout({ missing: ['password'] }),
          password: '123',
        });
      } catch (error) {
        const { data, status } = error.response;
        const [firstError, ...errors] = data.errors;
        expect(status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(firstError).toHaveProperty('msg', PASSWORD_INVALID_LENGTH);
      }
    });

    it('Should return an error if the username already exists', async () => {
      try {
        await instance.post('/api/auth/register', {
          username: user.username,
          ...factoriesUser.getDataWithout({ missing: ['username'] }),
        });
      } catch (error) {
        const { data, status } = error.response;
        const [firstError, ...errors] = data.errors;
        expect(status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);

        expect(firstError).toHaveProperty('msg', USERNAME_ALREADY_IN_USE);
      }
    });

    it('Should return an error if the email already exists', async () => {
      try {
        await instance.post('/api/auth/register', {
          ...factoriesUser.getDataWithout({ missing: ['email'] }),
          email: user.email,
        });
      } catch (error) {
        const { data, status } = error.response;
        const [firstError, ...errors] = data.errors;
        expect(status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);

        expect(firstError).toHaveProperty('msg', EMAIL_ALREADY_IN_USE);
      }
    });

    it('Should register a new user', async () => {
      const userData = factoriesUser.getData();

      const response = await instance.post('/api/auth/register', userData);

      expect(response.status).toBe(StatusCodes.CREATED);
      const { _id, ...userWithoutIdMongo } = response.data.user;
      const { password, ...userDataWithoutPassword } = userData;
      expect(_id).toBeTruthy();
      expect(userWithoutIdMongo).toEqual(userDataWithoutPassword);
    });
  });
  afterAll(async () => {
    await factoriesUser.removeAll();
    await stopServer();
  });
});
