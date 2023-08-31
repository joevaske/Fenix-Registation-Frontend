import { useState } from 'react';
import './CreateUser.css';

import axios from 'axios';

const CreateUser = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [streetNr, setStreetNr] = useState('');
  const [postNr, setPostNr] = useState('');
  const [livingPlace, setLivingPlace] = useState('');
  const [pid, setPid] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [accessDate, setAccessDate] = useState('2023-05-15');
  const [role, setRole] = useState('member');
  const [status, setStatus] = useState('active');
  const [password, setPassword] = useState('');

  const onFnameChanged = (e) => setFname(e.target.value);
  const onLnameChanged = (e) => setLname(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onStreetChanged = (e) => setStreet(e.target.value);
  const onStreetNrChanged = (e) => setStreetNr(e.target.value);
  const onPostNrChanged = (e) => setPostNr(e.target.value);
  const onLivingPlaceChanged = (e) => setLivingPlace(e.target.value);
  const onPidChanged = (e) => setPid(e.target.value);
  const onBirthDateChanged = (e) => setBirthDate(e.target.value);
  const onRoleChanged = (e) => setRole(e.target.value);
  const onStatusChanged = (e) => setStatus(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const addUser = () => {
    axios
      .post('http://localhost:3001/create', {
        fname: fname,
        lname: lname,
        email: email,
        street: street,
        street_nr: streetNr,
        post_nr: postNr,
        living_place: livingPlace,
        pid: pid,
        birth_date: birthDate,
        access_date: accessDate,
        role: role,
        status: status,
        password: password,
      })
      .then(() => console.log('success'));
  };
  return (
    <div className='create-user'>
      <form>
        <div className='form-row'>
          <label htmlFor='fname'>First Name:</label>
          <input
            type='text'
            id='fname'
            name='fname'
            onChange={onFnameChanged}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='lname'>Last Name:</label>
          <input
            type='text'
            id='lname'
            name='lname'
            onChange={onLnameChanged}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            onChange={onEmailChanged}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='street'>Streer (address):</label>
          <input
            type='text'
            id='street'
            name='street'
            onChange={onStreetChanged}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='street_nr'>Street Number:</label>
          <input
            type='text'
            id='street_nr'
            name='street_nr'
            onChange={onStreetNrChanged}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='post_nr'>Post Number:</label>
          <input
            type='text'
            id='post_nr'
            name='post_nr'
            onChange={onPostNrChanged}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='living_place'>Living Place:</label>
          <input
            type='text'
            id='living_place'
            name='living_place'
            onChange={onLivingPlaceChanged}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='pid'>Personal Id:</label>
          <input type='text' id='pid' name='pid' onChange={onPidChanged} />
        </div>
        <div className='form-row'>
          <label htmlFor='birth_date'>Birth date:</label>
          <input
            type='date'
            id='birth_date'
            name='birth_date'
            onChange={onBirthDateChanged}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='role'>Role:</label>
          <select id='role' name='role' onChange={onRoleChanged}>
            <option value='member'>Member</option>
            <option value='trainer'>Trainer</option>
            <option value='competitor'>Competitor</option>
          </select>
        </div>
        <div className='form-row'>
          <label htmlFor='status'>Status:</label>
          <select id='status' name='status' onChange={onStatusChanged}>
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
          </select>
        </div>
        <div className='form-row'>
          <label htmlFor='password'>Password:</label>
          <input
            type='text'
            id='password'
            name='password'
            onChange={onPasswordChanged}
          />
        </div>

        <div className='form-button'>
          <button className='btn btn-action' type='button' onClick={addUser}>
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
