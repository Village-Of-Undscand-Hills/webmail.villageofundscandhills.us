import { Mail, Trash2, Reply, Forward, MoreHorizontal } from 'lucide-react';
import type { Email } from '../types';

interface EmailListProps {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
}

export function EmailList({ emails, onSelectEmail }: EmailListProps) {
  const handleAction = () => {
    alert('Error 500: Service Temporarily Unavailable');
  };

  return (
    <div className="bg-white border border-[#CCCCCC]">
      <div className="bg-[#E5E5E5] p-2 border-b border-[#CCCCCC] flex gap-2">
        <button
          onClick={handleAction}
          className="bg-[#F0F0F0] border border-[#999999] px-2 py-1 text-sm font-['Arial'] flex items-center gap-1"
        >
          <Mail className="w-4 h-4" /> New
        </button>
        <button
          onClick={handleAction}
          className="bg-[#F0F0F0] border border-[#999999] px-2 py-1 text-sm font-['Arial'] flex items-center gap-1"
        >
          <Reply className="w-4 h-4" /> Reply
        </button>
        <button
          onClick={handleAction}
          className="bg-[#F0F0F0] border border-[#999999] px-2 py-1 text-sm font-['Arial'] flex items-center gap-1"
        >
          <Forward className="w-4 h-4" /> Forward
        </button>
        <button
          onClick={handleAction}
          className="bg-[#F0F0F0] border border-[#999999] px-2 py-1 text-sm font-['Arial'] flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
        <button
          onClick={handleAction}
          className="bg-[#F0F0F0] border border-[#999999] px-2 py-1 text-sm font-['Arial'] flex items-center gap-1"
        >
          <MoreHorizontal className="w-4 h-4" /> More
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#E5E5E5] text-left">
            <th className="p-2 border border-[#CCCCCC] font-['Arial']">From</th>
            <th className="p-2 border border-[#CCCCCC] font-['Arial']">Subject</th>
            <th className="p-2 border border-[#CCCCCC] font-['Arial']">Date</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr
              key={email.id}
              onClick={() => onSelectEmail(email)}
              className={`cursor-pointer hover:bg-[#F5F5F5] ${
                email.read ? 'text-[#666666]' : 'font-bold'
              }`}
            >
              <td className="p-2 border border-[#CCCCCC] font-['Arial']">
                {email.from}
              </td>
              <td className="p-2 border border-[#CCCCCC] font-['Arial']">
                {email.subject}
              </td>
              <td className="p-2 border border-[#CCCCCC] font-['Arial']">
                {email.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}