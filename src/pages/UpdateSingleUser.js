import { useParams } from 'react-router-dom';
import UpdateUser from '../components/users/update-user/UpdateUser';

const UpdateSingleUser = () => {
  const params = useParams();

  return (
    <div className='update-single-user'>
      <UpdateUser />
    </div>
  );
};

export default UpdateSingleUser;
