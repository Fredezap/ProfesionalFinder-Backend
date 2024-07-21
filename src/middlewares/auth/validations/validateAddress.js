import { check } from 'express-validator';
import errorCodes from '../../../constants/errorCodes';

const { DIRECCION_NO_VALIDA } = errorCodes.authErrors;

const validateAddress = check('state', DIRECCION_NO_VALIDA)
    .exists().isString().isLength({ min: 2 });

export default validateAddress;