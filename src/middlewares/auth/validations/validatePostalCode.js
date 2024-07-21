import { check } from 'express-validator';
import errorCodes from '../../../constants/errorCodes';

const { CODIGO_POSTAL_NO_VALIDO } = errorCodes.authErrors;

const validatePostalCode = check('postalCode', CODIGO_POSTAL_NO_VALIDO)
    .exists().isString().isLength({ min: 4 });

export default validatePostalCode;