import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () =>
{
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const {data:roleData,isLoading}=useQuery(
    {
        queryKey: ['userRole', user?.email],
        enabled: !!user?.email && !loading, 
        queryFn: async () => {
            const res=await axiosSecure.get(`/userRole?email=${user?.email}`);
            return res.data.role;
        }
    }
  )
if(loading || isLoading){
    return { role: null };
}
  return { role: roleData };
};

export default useRole;