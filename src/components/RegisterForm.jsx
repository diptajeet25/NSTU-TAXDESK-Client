import { CircleAlert, Eye, EyeOff, Shield } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Context/AuthContext';
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import { Link, useNavigate } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';

const RegisterForm = () => {
    const {register, handleSubmit,getValues, formState: { errors }} = useForm();
    const navigate=useNavigate();
    const {user,setUser,createUser,userDetails,setUserDetails}=useContext(AuthContext);
      const [showPassword, setShowPassword] = useState(false);

      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      const axiosSecure=useAxiosSecure();
      const registerUser = (data)=>{
        console.log(data);
        const photo=data.photo[0];
        createUser(data.email,data.password)
        .then(async()=>
        {
            setUser(auth.currentUser);
            const formdata=new FormData();
            formdata.append("image",photo);
            const url=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_hosting_key}`;
            const res=await fetch(url,{
                method:"POST",
                body:formdata
            });
            const imageData=await res.json();            
            console.log(imageData);
            const profile={
                displayName:data.name,
                photoURL:imageData.data.url
            }
            await updateProfile(auth.currentUser,profile)
            console.log("Profile Updated");
            const userInfo={
                name:data.name,
                photourl:imageData.data.url,
                email:data.email,
                designation:data.designation,
                role:"user",
                active:true,
                createdAt:new Date()
            }
            axiosSecure.post("/users",userInfo)
            .then((res)=>
            {
                console.log(res.data);
            }).catch(error=>
            {                console.log(error);
            });
            
            console.log(userInfo);
            setUserDetails(userInfo);
            console.log(userDetails);


            await sendEmailVerification(auth.currentUser,{
                url:`${window.location.origin}/dashboard`,
                handleCodeInApp:false
            }
            );
            navigate("/verify-email");
   console.log("Verification Email Sent");
    
                
                       
                     
            })
    .catch(error=> 
                {
    console.log(error);
                })
          }
      
  return (
    <div className='bg-white rounded-xl w-[90%] lg:w-[60%] !mx-auto !py-6 mt-10 flex flex-col items-start gap-3 shadow-md !px-4'>
        <h3 className="text-2xl font-bold  mb-2">Create Your Account</h3>
        <p className="text-gray-600 text-sm  ">Fill in your details to register for the NSTU TAXDESK</p>
        <div className='w-full flex items-center justify-center !my-1'>
        <p className="bg-[#E9E7F7]  text-center text-sm flex gap-1 text-primary !px-4 !mt-4 !py-3 rounded-xl"> <CircleAlert /> Email verification will be required to activate your account.</p>
        </div>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(registerUser)}>
             <div className='flex flex-col gap-1 items-start w-full '>
            <label className="font-bold !px-1">Full Name</label>
            <input type="text" placeholder="Enter your Full Name" {...register("name", { required: "Full Name is required" })} className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
            <div className='flex flex-col gap-1 items-start w-full '>
            <label className="font-bold !px-1">Email</label>
            <input type="text" placeholder="Enter your Email Address" {...register("email", { required: "Email is required" })} className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className='flex flex-col gap-1 items-start w-full'>
            <label className="font-bold !px-1">Photo</label>
            <input type="file" accept="image/*" {...register("photo", { required: "Photo is required" })} className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
            {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
        </div>
            <div className='flex flex-col gap-1 items-start w-full '>
            <label className="font-bold !px-1">Designation</label>
            <select {...register("designation", { required: "Designation is required" })} className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2">
                <option value="">Select your Designation</option>
                <option value="teacher">Teacher</option>
                <option value="officer">Officer</option>
                <option value="staff">Staff</option>
            </select>
            {errors.designation && <p className="text-red-500 text-sm">{errors.designation.message}</p>}
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
        <div className="flex flex-col gap-1 items-start w-full">
            <label className="font-bold !px-1">Confirm Password</label>
            <div className='relative w-full'>
            <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your Password" {...register("confirmPassword", { required: "Confirm Password is required",validate: (value) =>
        value === getValues("password") || "Passwords do not match" })} className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-6 lg:right-12 top-3 text-sm hover:opacity-70 focus:outline-none"
                  style={{ color: 'var(--nstu-text-muted)' }}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

        </div>
        <button type="submit" className="bg-primary text-white rounded-lg w-[95%] !py-2 !mt-2">Create Account</button>
        <span className="text-sm text-gray-600 text-center">Already have an account? <Link to="/auth/login" className="text-primary font-bold">Login here</Link></span>

        </form>
        <div className='w-[90%] !mx-auto'>
        <hr className='w-full h-0.1 bg-gray-600 !my-1 '></hr>
        </div>
        <div className="flex gap-1 w-[90%] !mx-auto  text-sm text-gray-500 ">
          <Shield />
          This system is only for authorized NSTU teachers, officers, and staff. Unauthorized access is prohibited and will be reported.

        </div>
    </div>
  )
}

export default RegisterForm