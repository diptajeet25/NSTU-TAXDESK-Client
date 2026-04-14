import { Mail, Save, User } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Loading from '../components/Loading';
import { updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import toast from 'react-hot-toast';
import AccountStatusCards from '../components/AccountStatusCards';
import ProfileStatsCards from '../components/ProfileStatsCards';
import { useForm } from 'react-hook-form';

const Profile = () => {
  const {user,loading,setUser,setUserDetails}=useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      name: '',
      email: '',
      designation: '',
      department: '',
      photourl: ''
    }
  });
  const axiosSecure=useAxiosSecure();
  const {data:profileInfo,isLoading,refetch}=useQuery(
    {
      queryKey:["profileInfo",user?.email],
      enabled:!loading && !!user?.email,
      queryFn:async()=>{
        const res=await axiosSecure.get(`/profile?email=${user.email}`);
        return res.data;
      }
    }
  )

  const designationValue = watch('designation');
  const departmentValue = watch('department');

  const { data: entities = [] } = useQuery({
    queryKey: ["entities", designationValue],
    enabled: isEditing && !!designationValue,
    queryFn: async () => {
      const res = await axiosSecure.get(`/entities?designation=${designationValue}`);
      return res.data;
    }
  });

  useEffect(() => {
    if (!profileInfo) return;
    reset({
      name: profileInfo?.name || '',
      email: profileInfo?.email || '',
      designation: profileInfo?.designation || '',
      department: profileInfo?.department || '',
      photourl: profileInfo?.photourl || ''
    });
  }, [profileInfo, reset]);

  const startEditing = () => {
    reset({
      name: profileInfo?.name || '',
      email: profileInfo?.email || '',
      designation: profileInfo?.designation || '',
      department: profileInfo?.department || '',
      photourl: profileInfo?.photourl || ''
    });
    setImageFile(null);
    setPreviewImage('');
    setIsEditing(true);
  };

  const cancelEditing = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    reset({
      name: profileInfo?.name || '',
      email: profileInfo?.email || '',
      designation: profileInfo?.designation || '',
      department: profileInfo?.department || '',
      photourl: profileInfo?.photourl || ''
    });
    setImageFile(null);
    setPreviewImage('');
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    if (!file) {
      setPreviewImage('');
      return;
    }
    setPreviewImage(URL.createObjectURL(file));
  };

  const saveProfile = async (data) => {
    if (!isEditing) return;

    setIsSaving(true);
    try {
      const payload = { ...data };

      if (imageFile) {
        const formdata = new FormData();
        formdata.append("image", imageFile);
        const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_hosting_key}`;
        const uploadRes = await fetch(uploadUrl, {
          method: "POST",
          body: formdata
        });
        const imageData = await uploadRes.json();
        payload.photourl = imageData?.data?.url || payload.photourl;
      }
      let updateRes;
      try {
        updateRes = await axiosSecure.patch(`/profile?email=${user?.email}`, payload);
      } catch {
        updateRes = await axiosSecure.patch(`/users?email=${user?.email}`, payload);
      }

      const modifiedCount = updateRes?.data?.modifiedCount;
      const matchedCount = updateRes?.data?.matchedCount;
      if (typeof modifiedCount === 'number' && modifiedCount === 0 && typeof matchedCount === 'number' && matchedCount === 0) {
        throw new Error('No matching user found for update');
      }
      if (auth.currentUser && payload.photourl) {
        await updateProfile(auth.currentUser, {
          displayName: payload.name,
          photoURL: payload.photourl
        });
      }
      if (auth.currentUser) {
        const updatedAuthUser = {
          ...auth.currentUser,
          displayName: payload.name || auth.currentUser.displayName,
          photoURL: payload.photourl || auth.currentUser.photoURL
        };
        setUser(updatedAuthUser);
        setUserDetails(updatedAuthUser);
      }

      await refetch();
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
      reset(payload);
      setImageFile(null);
      setPreviewImage('');
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch  {
      toast.error('Profile update failed. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  if(loading || isLoading) {
    return <Loading></Loading>
  }
  return (
    <section className="flex-1 min-w-0 h-full bg-gray-50 !px-4 sm:!px-5 lg:!px-7 !py-5 lg:!py-7 overflow-auto hide-scrollbar border-l border-gray-200">
          <div className="w-full max-w-7xl !mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">User Profile</h1>
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg !mt-2 max-w-3xl leading-relaxed">
             Manage your account settings and personal information.
            </p>

             <div className="!mt-6 bg-white rounded-2xl shadow-sm border border-slate-200 !px-4 sm:!px-6 lg:!px-8 !py-5 sm:!py-6">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-4 sm:gap-5 lg:gap-7">
                <div className="shrink-0">
                  <img src={isEditing && previewImage ? previewImage : profileInfo?.photourl} alt="Profile" className="w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full object-cover border-2 border-primary/25 shadow-sm" />
                  {isEditing && (
                    <label className="btn btn-outline !mt-3 !px-3 !py-1.5 text-xs sm:text-sm w-full cursor-pointer">
                      Change Picture
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div className='w-full md:flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left gap-1.5'>
                  
                  <h2 className='text-slate-900 text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight break-all'>{profileInfo?.name}</h2>
<h4 className='text-slate-700 text-base sm:text-lg lg:text-xl'>
  {profileInfo?.designation
    ? `${profileInfo.designation.charAt(0).toUpperCase()}${profileInfo.designation.slice(1)}`
    : ''}
</h4>
<h4 className='text-slate-600 text-sm sm:text-base lg:text-lg'>Department of {profileInfo?.department}</h4>
<h4 className='text-slate-500 text-xs sm:text-sm lg:text-base break-all flex items-center gap-2'>
  <Mail size={16} className='text-slate-400 shrink-0' />
  <span>{profileInfo?.email}</span>
</h4>
{!isEditing && <button onClick={startEditing} type='button' className='btn btn-primary !mt-2 !px-5 !py-2 text-sm sm:text-base'>Edit Profile</button>}
                </div>
                   

                    </div>


              </div>
    <ProfileStatsCards profileInfo={profileInfo} />
              <div className="!mt-6 bg-white rounded-2xl shadow-sm border border-slate-200 !px-4 sm:!px-6 lg:!px-8 !py-5 sm:!py-6">
                <div className="flex items-center gap-2">
                  <User size={21} className='text-primary'/>
                  <h2 className="text-lg font-semibold text-slate-900">Personal Information</h2>
                </div>

                <form onSubmit={handleSubmit(saveProfile)} className="!mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-700">Full Name</span>
                    <input
                      type="text"
                      disabled={!isEditing}
                      {...register('name')}
                      className="h-11 rounded-xl border border-slate-300 bg-slate-50 !px-3 text-slate-800 outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-700">Email Address</span>
                    <input
                      type="email"
                      disabled="true"
                      {...register('email')}
                      className="h-11 rounded-xl border border-slate-300 bg-slate-50 !px-3 text-slate-800 outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-700">Designation</span>
                    <select
                      disabled={!isEditing}
                      {...register('designation', {
                        onChange: () => setValue('department', '')
                      })}
                      className="h-11 rounded-xl border border-slate-300 bg-slate-50 !px-3 text-slate-800 outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
                    >
                      <option value="">Select your Designation</option>
                      <option value="teacher">Teacher</option>
                      <option value="officer">Officer</option>
                      <option value="staff">Staff</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-700">Department</span>
                    {!isEditing ? (
                      <input
                        type="text"
                        readOnly
                        value={departmentValue || profileInfo?.department || ''}
                        className="h-11 rounded-xl border border-slate-300 !px-3 outline-none bg-slate-100 text-slate-500"
                      />
                    ) : (
                      <select
                        disabled={!designationValue}
                        {...register('department')}
                        className="h-11 rounded-xl border border-slate-300 !px-3 outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 bg-slate-50 text-slate-800"
                      >
                        <option value="">Select your Department/Section</option>
                        {entities?.map((entity) => (
                          <option key={entity._id} value={entity.name}>{entity.name}</option>
                        ))}
                      </select>
                    )}
                  </label>

                  <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 !mt-1">
                    <p className="text-xs sm:text-sm text-slate-500">
                      {isEditing ? 'Review your changes before saving.' : 'Click Edit Profile to update your information.'}
                    </p>
                    {isEditing && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={cancelEditing}
                          disabled={isSaving}
                          className="btn !px-5 !py-2.5 text-sm sm:text-base"
                        >
                          Cancel
                        </button>
                        <button type="submit" disabled={isSaving} className="btn btn-primary !px-5 !py-2.5 text-sm sm:text-base flex items-center justify-center gap-2"> <Save size={16} /> {isSaving ? 'Saving...' : 'Save Changes'}</button>
                      </div>
                    )}
                  </div>
                </form>
              </div>

              <AccountStatusCards profileInfo={profileInfo} user={user} />
              

      </div>
        </section>
  )
}

export default Profile