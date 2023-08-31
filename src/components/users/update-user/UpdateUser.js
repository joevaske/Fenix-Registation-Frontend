import { useState, useEffect } from 'react';
import './UpdateUser.css';

import axios from 'axios';

const UpdateUser = ({ id }) => {
  console.log(id);
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

  const [user, setUser] = useState([]);

  const getSingleUser = () => {
    axios
      .get(`http://localhost:3001/single-user`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        setFname(response.data[0].user_fname);
        setLname(response.data[0].user_lname);
        setEmail(response.data[0].user_email);
        setStreet(response.data[0].user_street);
        setStreetNr(response.data[0].user_street_nr);
        setPostNr(response.data[0].user_post_nr);
        setLivingPlace(response.data[0].user_living_place);
        setPid(response.data[0].user_pid);
        setBirthDate(response.data[0].user_birth_date);
        setAccessDate(response.data[0].user_access_date);
        setRole(response.data[0].user_role);
        setStatus(response.data[0].user_status);
        setPassword(response.data[0].user_password);
      });
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  const updateUser = () => {
    axios
      .put('http://localhost:3001/update', {
        id: id,
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
    <div className='update-user'>
      <form>
        <div className='form-row'>
          <label htmlFor='fname'>First Name:</label>
          <input
            type='text'
            id='fname'
            name='fname'
            value={fname}
            onChange={onFnameChanged}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='lname'>Last Name:</label>
          <input
            type='text'
            id='lname'
            name='lname'
            value={lname}
            onChange={onLnameChanged}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={onEmailChanged}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='street'>Streer (address):</label>
          <input
            type='text'
            id='street'
            name='street'
            value={street}
            onChange={onStreetChanged}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='street_nr'>Street Number:</label>
          <input
            type='text'
            id='street_nr'
            name='street_nr'
            value={streetNr}
            onChange={onStreetNrChanged}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='post_nr'>Post Number:</label>
          <input
            type='text'
            id='post_nr'
            name='post_nr'
            value={postNr}
            onChange={onPostNrChanged}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='living_place'>Living Place:</label>
          <input
            type='text'
            id='living_place'
            name='living_place'
            value={livingPlace}
            onChange={onLivingPlaceChanged}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='pid'>Personal Id:</label>
          <input
            type='text'
            id='pid'
            name='pid'
            value={pid}
            onChange={onPidChanged}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='birth_date'>Birth date:</label>
          <input
            type='date'
            id='birth_date'
            name='birth_date'
            value={birthDate}
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
          <select
            id='status'
            name='status'
            onChange={onStatusChanged}
            value={status}
          >
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
            value={password}
            onChange={onPasswordChanged}
          />
        </div>
        <div className='form-button'>
          <button className='btn btn-action' type='button' onClick={updateUser}>
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
