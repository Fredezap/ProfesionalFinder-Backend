import { check } from 'express-validator';
import errorCodes from '../../../constants/errorCodes';

const { CIUDAD_NO_VALIDA } = errorCodes.authErrors;

const validateCity = check('city', CIUDAD_NO_VALIDA)
    .exists().isString().isLength({ min: 2 });

export default validateCity;