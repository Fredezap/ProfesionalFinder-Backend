import { check } from 'express-validator';
import errorCodes from '../../../constants/errorCodes';

const { EMAIL_NOT_VALID } = errorCodes;

const validateEmailFormat = check('email', EMAIL_NOT_VALID).exists().isEmail();

export default validateEmailFormat;
