import React from 'react'
import { Calendar, Clock, Mail, Shield } from 'lucide-react'

const AccountStatusCards = ({ profileInfo, user }) => {
  const formatDateTime = (value) => {
    if (!value) return 'N/A';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'N/A';
    return date.toLocaleString('en-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="!mt-6 bg-white rounded-2xl shadow-sm border border-slate-200 !px-4 sm:!px-6 lg:!px-8 !py-5 sm:!py-6">
      <h2 className="text-lg font-semibold text-slate-900">Account Status</h2>
      <p className="text-slate-600 text-sm !mt-1">Your verification and account timeline details.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 !mt-4">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 !p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-between items-start gap-3">
          <div>
            <p className="text-[11px] tracking-wide uppercase text-slate-500">Account Status</p>
            <p className={`text-base font-bold !mt-2 ${profileInfo?.active ? 'text-emerald-600' : 'text-rose-600'}`}>
              {profileInfo?.active ? 'Active' : 'Inactive'}
            </p>
          </div>
          <div className="text-primary !p-3 rounded-2xl bg-[#E9E7F7]">
            <Shield size={18} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 !p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-between items-start gap-3">
          <div>
            <p className="text-[11px] tracking-wide uppercase text-slate-500">Email Verified</p>
            <p className={`text-base font-bold !mt-2 ${user?.emailVerified ? 'text-emerald-600' : 'text-amber-600'}`}>
              {user?.emailVerified ? 'Verified' : 'Not Verified'}
            </p>
          </div>
          <div className="text-primary !p-3 rounded-2xl bg-[#E9E7F7]">
            <Mail size={18} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 !p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-between items-start gap-3">
          <div>
            <p className="text-[11px] tracking-wide uppercase text-slate-500">Registered Date</p>
            <p className="text-sm font-semibold text-slate-800 !mt-2 leading-relaxed">
              {formatDateTime(profileInfo?.createdAt)}
            </p>
          </div>
          <div className="text-primary !p-3 rounded-2xl bg-[#E9E7F7]">
            <Calendar size={18} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 !p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-between items-start gap-3">
          <div>
            <p className="text-[11px] tracking-wide uppercase text-slate-500">Last Login</p>
            <p className="text-sm font-semibold text-slate-800 !mt-2 leading-relaxed">
              {formatDateTime(profileInfo?.lastLogin)}
            </p>
          </div>
          <div className="text-primary !p-3 rounded-2xl bg-[#E9E7F7]">
            <Clock size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountStatusCards
