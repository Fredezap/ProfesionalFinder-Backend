import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import errorCodes from '../../src/constants/errorCodes';
import factoriesUser from '../utils/factories/user';

const { describe, it, beforeEach, afterEach } = require('@jest/globals');
const instance = axios.create({
  baseURL: process.env.BASE_URL,
});
const { EMAIL_NOT_VALID, PASSWORD_NOT_VALID, PASSWORD_INVALID_LENGTH } =
  errorCodes;

let user;
let userData;

describe('Auth API', () => {
  beforeEach(async () => {
    userData = factoriesUser.getData();
    user = await factoriesUser.create(userData);
  });
  describe('POST /api/auth', () => {
    it('Should return an error for an empty body', async () => {
      const errorsAll = [
        EMAIL_NOT_VALID,
        EMAIL_NOT_VALID,
        PASSWORD_NOT_VALID,
        PASSWORD_INVALID_LENGTH,
      ];
      try {
        await instance.post('/api/auth', {});
      } catch (error) {
        const { data, status } = error.response;
        expect(status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(data.errors).toEqual(expect.any(Array));
        for (let index = 0; index < data.errors.length; index++) {
          expect(data.errors[index]).toHaveProperty('msg', errorsAll[index]);
        }
      }
    });

    it('Should return an error for the email format', async () => {
      try {
        await instance.post('/api/auth', {
          email: factoriesUser.getFakeByType('username'),
        });
      } catch (error) {
        const { data, status } = error.response;
        expect(status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(data.errors).toEqual(expect.any(Array));
        const [firstError, ...errors] = data.errors;
        expect(firstError).toHaveProperty('msg', EMAIL_NOT_VALID);
      }
    });

    it('Should return an error for the incorrect password', async () => {
      try {
        await instance.post('/api/auth', {
          email: userData.email,
          password: factoriesUser.getFakeByType('password'),
        });
      } catch (error) {
        const { data, status } = error.response;
        expect(status).toBe(StatusCodes.UNAUTHORIZED);
        // TODO: the data error comes in html and not in the error check
      }
    });

    it('Should return an error because the email does not exist', async () => {
      try {
        await instance.post('/api/auth', {
          email: factoriesUser.getFakeByType('email'),
          password: factoriesUser.getFakeByType('password'),
        });
      } catch (error) {
        const { data, status } = error.response;
        expect(status).toBe(StatusCodes.UNAUTHORIZED);
        // TODO: the data error comes in html and not in the error check
      }
    });

    it('Should return the user with the token', async () => {
      const response = await instance.post('/api/auth', { ...userData });
      const { data, status } = response;
      expect(status).toBe(StatusCodes.OK);
      expect(data?._id).toBeTruthy();
      expect(data?.password).toBeFalsy();
      expect(data?.token).toBeTruthy();
    });
  });
  afterEach(async () => {
    await factoriesUser.removeAll();
  });
});
