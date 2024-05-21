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

const userData = {
  getMockDataUser,
  getMockDataUserWithout,
};

export default userData;
