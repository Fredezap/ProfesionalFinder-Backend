import { check } from 'express-validator';
import errorCodes from '../../../constants/errorCodes';

const { PROVINCIA_NO_VALIDA } = errorCodes.authErrors;

const validateState = check('state', PROVINCIA_NO_VALIDA)
    .exists().isString().isLength({ min: 4 });

export default validateState;