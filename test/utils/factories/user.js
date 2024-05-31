import { User } from '../../../src/models/userModel';
import userData from '../datasets/userData';

const { getMockDataUser, getMockDataUserWithout, getFakeDataByType } = userData;

const getFakeByType = (type) => getFakeDataByType(type);
const getData = () => getMockDataUser();
const getDataWithout = ({ missing = [] }) =>
  getMockDataUserWithout({ missing });

const create = async (userData = { ...getMockDataUser() }) => {
  const user = await User.create(userData);

  return {
    ...user.toJSON(),
  };
};

const removeAll = () => User.remove({});

const factoriesUser = {
  getData,
  getFakeByType,
  getDataWithout,
  create,
  removeAll,
};

export default factoriesUser;
