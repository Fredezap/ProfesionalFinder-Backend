import { User } from '../../../src/models/userModel';
import userData from '../datasets/userData';

const { getMockDataUser, getMockDataUserWithout } = userData;

const getData = () => getMockDataUser();
const getDataWithout = ({ missing = [] }) =>
  getMockDataUserWithout({ missing });

const create = async () => {
  let userData = { ...getMockDataUser() };

  const user = await User.create(userData);

  return {
    ...user.toJSON(),
  };
};

const removeAll = () => User.remove({});

const factoriesUser = {
  getData,
  getDataWithout,
  create,
  removeAll,
};

export default factoriesUser;
