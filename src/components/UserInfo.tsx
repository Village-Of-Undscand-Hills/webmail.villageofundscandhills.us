import type { User } from '../types';

interface UserInfoProps {
  user: User;
}

export function UserInfo({ user }: UserInfoProps) {
  const quotaPercentage = (user.quotaUsed / user.quotaTotal) * 100;

  return (
    <div className="bg-[#E5E5E5] p-4 border border-[#CCCCCC] mb-4">
      <div className="font-['Arial'] text-sm">
        <p>Welcome, {user.fullName}</p>
        <p className="text-[#666666]">Last login: {user.lastLogin}</p>
        <div className="mt-2">
          <div className="text-[#666666]">Storage Quota:</div>
          <div className="w-full bg-[#CCCCCC] h-4 mt-1">
            <div
              className="bg-[#003366] h-full"
              style={{ width: `${quotaPercentage}%` }}
            ></div>
          </div>
          <div className="text-xs text-[#666666] mt-1">
            {user.quotaUsed}MB of {user.quotaTotal}MB used
          </div>
        </div>
      </div>
    </div>
  );
}