const axios = require("axios");
const faker = require("faker");


const signup = async (firstname, lastname, email, password) => {
  
  try {
    await axios.post("http://localhost:3000/signup", {
      firstname,
      lastname,
      email,
      password,
    });
    console.log(`User: ${firstname} ${lastname} created.`);
    //   console.log(response.data);
  } catch (error) {
    console.error(error);
  } 
};


const generateRandomUser = () => ({
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

const signupRandomUsers = async (numUsers) => {
  
  for (let i = 0; i < numUsers; i++) {
    const user = generateRandomUser();
    await signup(user.firstname, user.lastname, user.email, user.password);
  }
};


signupRandomUsers(100);