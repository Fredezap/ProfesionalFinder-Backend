import { faker } from '@faker-js/faker';

const getMockDataUser = () => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
  email: faker.internet.email(),
});

const getMockDataUserWithout = ({ missing = [] }) => {
  const data = getMockDataUser();
  missing.forEach((prop) => {
    delete data[prop];
  });
  return data;
};

const getFakeDataByType = (type) => {
  const generator = getMockDataUser()[type];
  if (!generator) {
    throw new Error(`Unknown mock data type: ${type}`);
  }
  return generator;
};

const userData = {
  getMockDataUser,
  getMockDataUserWithout,
  getFakeDataByType,
};

export default userData;
