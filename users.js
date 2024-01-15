import { users } from "../config/mongoCollections.js";
import { checkEmail, checkName, checkPassword, checkRole } from "../helpers.js";
import bcrypt from 'bcrypt';
const saltRounds = 12;

//import mongo collections, bcrypt and implement the following data functions
export const registerUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {

  firstName = checkName(firstName,'firstName');
  lastName = checkName(lastName,'lastName');
  emailAddress = checkEmail(emailAddress, 'emailAddress');
  password = checkPassword(password,'password');
  role = checkRole(role, 'role');

  let hash = await bcrypt.hash(password, saltRounds);

  let newUser = {
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    password: hash,
    role: role
  }

  const userCollection = await users();
  const existUser = await userCollection.findOne({emailAddress: emailAddress});
  if(existUser){
    throw "there is already a user with that email address";
  }
  const newInsertInformation = await userCollection.insertOne(newUser);
  if(!newInsertInformation.insertedId || !newInsertInformation.acknowledged){
    throw "register failed";
  }
  return {insertedUser: true};
};

export const loginUser = async (emailAddress, password) => {

  emailAddress = checkEmail(emailAddress, 'emailAddress');
  password = checkPassword(password,'password');
  
  const userCollection = await users();
  const findUser = await userCollection.findOne({emailAddress: emailAddress});
  if(findUser == null){
    throw "Either the email address or password is invalid";
  }

  let compareToSherlock = false;
  try {
    compareToSherlock = await bcrypt.compare(password, findUser.password);
  } catch (e) {
    throw "Either the email address or password is invalid";
  }
  if (!compareToSherlock) {
    throw "Either the email address or password is invalid";
  }
  return{firstName: findUser.firstName,
  lastName: findUser.lastName,
  emailAddress: findUser.emailAddress,
  role: findUser.role};
};
