import { Eye, EyeOff, Shield } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors }} = useForm();
    const {loginUser,logoutUser}=useContext(AuthContext);
    const navigate=useNavigate();
    const axiosSecure=useAxiosSecure();
    const queryClient = useQueryClient();
    const [load,setLoad]=useState(false);
   
    
    const [showPassword, setShowPassword] = useState(false);
    const handleLogin=async(data)=>
    {
        setLoad(true);
        try {
          const validityRes = await axiosSecure.get(`/loginValidity?email=${data.email}`);
          if(validityRes.data.message==="User not found")
          {
              toast.error("User not found. Please check your email or register for a new account.");
              return;
          }
          if(!validityRes.data.active)
          {
              toast.error("Your account is temporary deactivated. Please contact the administrator for more information.");
              return;
          }

          const credential = await loginUser(data.email, data.password);
          const loggedInUser = credential.user;

          if(loggedInUser?.emailVerified)
          {
              await axiosSecure.patch(`/users/lastLogin?email=${loggedInUser.email}`);

              await queryClient.invalidateQueries();
              await queryClient.refetchQueries({
                predicate: (query) => Array.isArray(query.queryKey) && query.queryKey.includes(loggedInUser.email),
              });

              toast.success("Login successful!");
              navigate("/dashboard/user");
          }
          else
          {
              await logoutUser();
              toast.error("Please verify your email before logging in.");
              navigate('/auth/login');
          }
        } catch (error) {
          console.error("Login Failed", error);
          toast.error("Login failed. Please check your credentials and try again.");
        } finally {
          setLoad(false);
        }
    }
  return (
   <div className='bg-white rounded-xl w-[90%] min-h-[60vh] lg:w-[60%] !mx-auto !py-6 !mt-12 flex flex-col items-start gap-3 shadow-md !px-4'>
     <h3 className="text-2xl font-bold  mb-2">Login to Your Account</h3>
        <p className="text-gray-600 text-sm  ">Welcome back! Please enter your credentials.</p>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(handleLogin)}>
        <div className='flex flex-col gap-1 items-start w-full '>
            <label className="font-bold !px-1">Email</label>
            <input type="text" placeholder="Enter your Email Address" {...register("email", { required: "Email is required" })} className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className='flex flex-col gap-1 items-start w-full '>
            <label className="font-bold !px-1">Password</label>
            <div className='relative w-full'>
            <input type={showPassword ? "text" : "password"} placeholder="Enter your Password" {...register("password", { required: "Password is required", minLength: 6, maxLength:12, pattern:/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).*$/ })} className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
               <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 lg:right-12 top-3 text-sm hover:opacity-70 focus:outline-none"
                  style={{ color: 'var(--nstu-text-muted)' }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            {errors.password?.type === "minLength" && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}
            {errors.password?.type === "maxLength" && <p className="text-red-500 text-sm">Password must be at most 12 characters</p>}
            {errors.password?.type === "pattern" && <p className="text-red-500 text-sm">Password must contain at least one uppercase letter, one special character, and one number</p>}
        </div>
          <Link to="/auth/forget-password" className="text-sm text-primary">Forget Password </Link>
                <button type="submit" className="bg-primary cursor-pointer text-white rounded-lg w-[95%] !py-2 !mt-2">
                {load ? "Logging in..." : "Login"}
                </button>
        <span className="text-sm text-gray-600 text-center"> Don't have an account? <Link to="/auth" className="text-primary font-bold">Register here</Link></span>
             <div className='w-[90%] !mx-auto'>
        <hr className='w-full h-0.1 bg-gray-600 !my-1 '></hr>
        </div>
        <div className="flex gap-1 w-[90%] !mx-auto  text-sm text-gray-500 ">
          <Shield />
          This system is only for authorized NSTU teachers, officers, and staff. Unauthorized access is prohibited and will be reported.

        </div>

        


        </form>
        
   </div>
  )
}

export default LoginForm