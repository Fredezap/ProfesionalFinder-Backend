import { check } from 'express-validator';
import errorCodes from '../../../constants/errorCodes';

const { EMAIL_NO_VALIDO } = errorCodes.authErrors;

const validateEmailFormat = check('email', EMAIL_NO_VALIDO).exists().isEmail();

export default validateEmailFormat;
