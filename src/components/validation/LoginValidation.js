export const validateLogin = (field) => {
  let lettersAndNumbers = /^[a-zA-ZšđčćžŠĐŽČĆ0-9_ ]*$/;
  let letters = /^[a-zA-ZšđčćžŠĐŽČĆ_ ]*$/;
  let numbers = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
  let emails =
    /^[a-zA-Z0-9.!$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (field.email.length <= 0) {
    return 'Email cannot be empty!';
  } else if (!field.email.match(emails)) {
    return 'Email must be valid!';
  } else if (field.password.length < 0) {
    return 'Password must cannot be empty!';
  } else if (field.password.length <= 5) {
    return 'Password must be longer than six characters!';
  } else {
    return false;
  }
};
