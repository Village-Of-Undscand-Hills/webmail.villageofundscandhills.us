import React from 'react';
import { Shield, User, LogOut } from 'lucide-react';

interface HeaderProps {
  onShowProfile: () => void;
  onLogout: () => void;
}

export function Header({ onShowProfile, onLogout }: HeaderProps) {
  return (
    <div className="bg-[#003366] text-white p-4 border-b-4 border-[#CC9933]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Shield className="w-8 h-8" />
          <div>
            <h1 className="font-['Times_New_Roman'] text-2xl">
              Village of Undscand Hills, Montana
            </h1>
            <p className="font-['Arial'] text-sm">
              Official Government Email System v1.0.2
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onShowProfile}
            className="bg-[#004080] hover:bg-[#004d99] px-3 py-1 rounded flex items-center gap-1 text-sm"
          >
            <User className="w-4 h-4" /> Profile
          </button>
          <button
            onClick={onLogout}
            className="bg-[#004080] hover:bg-[#004d99] px-3 py-1 rounded flex items-center gap-1 text-sm"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}