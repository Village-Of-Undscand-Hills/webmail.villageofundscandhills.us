import React from 'react';
import { User, Settings, Key } from 'lucide-react';
import type { User as UserType } from '../types';

interface UserProfileProps {
  user: UserType;
  onClose: () => void;
}

export function UserProfile({ user, onClose }: UserProfileProps) {
  const handleAction = () => {
    alert('Error 500: Service Temporarily Unavailable');
  };

  return (
    <div className="bg-white border border-[#CCCCCC]">
      <div className="bg-[#E5E5E5] p-2 border-b border-[#CCCCCC] flex justify-between items-center">
        <div className="font-['Arial'] font-bold">User Profile</div>
        <button
          onClick={onClose}
          className="text-[#666666] hover:text-[#333333]"
        >
          ✕
        </button>
      </div>

      <div className="p-4">
        <table className="w-full border-collapse mb-4">
          <tbody>
            <tr>
              <td className="p-2 border border-[#CCCCCC] bg-[#E5E5E5] w-32 font-['Arial']">
                Full Name:
              </td>
              <td className="p-2 border border-[#CCCCCC] font-['Arial']">
                {user.fullName}
              </td>
            </tr>
            <tr>
              <td className="p-2 border border-[#CCCCCC] bg-[#E5E5E5] font-['Arial']">
                Department:
              </td>
              <td className="p-2 border border-[#CCCCCC] font-['Arial']">
                {user.department}
              </td>
            </tr>
            <tr>
              <td className="p-2 border border-[#CCCCCC] bg-[#E5E5E5] font-['Arial']">
                Email:
              </td>
              <td className="p-2 border border-[#CCCCCC] font-['Arial']">
                {user.email}
              </td>
            </tr>
            <tr>
              <td className="p-2 border border-[#CCCCCC] bg-[#E5E5E5] font-['Arial']">
                Phone Ext:
              </td>
              <td className="p-2 border border-[#CCCCCC] font-['Arial']">
                {user.phoneExt}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex gap-2">
          <button
            onClick={handleAction}
            className="bg-[#F0F0F0] border border-[#999999] px-4 py-2 text-sm font-['Arial'] flex items-center gap-2"
          >
            <Settings className="w-4 h-4" /> Edit Profile
          </button>
          <button
            onClick={handleAction}
            className="bg-[#F0F0F0] border border-[#999999] px-4 py-2 text-sm font-['Arial'] flex items-center gap-2"
          >
            <Key className="w-4 h-4" /> Change Password
          </button>
        </div>
      </div>
    </div>
  );
}