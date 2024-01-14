export const validateUser = (field) => {
  let lettersAndNumbers = /^[a-zA-ZšđčćžŠĐŽČĆ0-9_ ]*$/;
  let letters = /^[a-zA-ZšđčćžŠĐŽČĆ_ ]*$/;
  let numbers = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
  let emails =
    /^[a-zA-Z0-9.!$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (field.fname.length < 0) {
    return 'First Name cannot be empty!';
  } else if (field.fname.length < 2) {
    return 'First Name must be longer than two characters!';
  } else if (!field.fname.match(letters)) {
    return 'First Name can contain only letters';
  } else if (field.lname.length < 0) {
    return 'Last Name cannot be empty!';
  } else if (field.lname.length < 2) {
    return 'Last Name must be longer than two characters!';
  } else if (!field.lname.match(letters)) {
    return 'Last Name can contain only letters';
  } else if (field.email.length < 0) {
    return 'Email cannot be empty!';
  } else if (!field.email.match(emails)) {
    return 'Email must be valid!';
  } else if (field.phone.length < 0) {
    return 'Phone Number cannot be empty!';
  } else if (field.phone.length < 9) {
    return 'Phone Number must be at least 9 characters';
  } else if (!field.phone.match(numbers)) {
    return 'Phone Number must contain numbers and/or + sign!';
  } else if (field.street.length < 0) {
    return 'Street/Address cannot be empty!';
  } else if (field.street.length < 2) {
    return 'Street/ Address must be longer than two characters!';
  } else if (!field.street.match(lettersAndNumbers)) {
    return 'Street/ Address can contain only letters and numbers';
  } else if (field.living_place.length < 0) {
    return 'Living Place cannot be empty!';
  } else if (field.living_place.length < 2) {
    return 'Living Place must be longer than two characters!';
  } else if (!field.living_place.match(letters)) {
    return 'Living Place can contain only letters';
  } else if (field.pid.length < 0) {
    return 'Personal ID must cannot be empty!';
  } else if (field.pid.length < 2) {
    return 'Personal ID must be longer than two characters!';
  } else if (field.password.length < 0) {
    return 'Password must cannot be empty!';
  } else if (field.password.length < 6) {
    return 'Password must be longer than six characters!';
  } else {
    return false;
  }
};
