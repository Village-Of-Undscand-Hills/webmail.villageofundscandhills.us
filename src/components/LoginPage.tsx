import React, { useState } from 'react';
import { Shield } from 'lucide-react';

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] content-center">
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white border border-[#CCCCCC] p-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Shield className="w-12 h-12 text-[#003366]" />
            <div className="text-center">
              <h1 className="font-['Times_New_Roman'] text-2xl text-[#003366]">
                Village of Undscand Hills
              </h1>
              <p className="font-['Arial'] text-sm text-[#666666]">
                Secure Government Email Portal
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <table className="w-full border-collapse border border-[#CCCCCC]">
              <tbody>
                <tr>
                  <td className="border border-[#CCCCCC] bg-[#E5E5E5] p-2 font-['Arial']">
                    Username:
                  </td>
                  <td className="border border-[#CCCCCC] p-2">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-2 py-1 border border-[#999999]"
                      aria-label="Username"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#CCCCCC] bg-[#E5E5E5] p-2 font-['Arial']">
                    Password:
                  </td>
                  <td className="border border-[#CCCCCC] p-2">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-2 py-1 border border-[#999999]"
                      aria-label="Password"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div className="mt-4 text-center">
              <button
                type="submit"
                className="bg-[#003366] text-white px-4 py-2 font-['Arial']"
              >
                Login to Secure System
              </button>
            </div>
          </form>

          <div className="mt-8 text-xs font-['Arial'] text-[#666666]">
            <p className="mb-2">
              This is a U.S. Government computer system. Unauthorized access is prohibited.
            </p>
            <p>
              For technical assistance, contact the IT Help Desk at (406) 555-4357
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}