import { ArrowLeft, Reply, Forward, Trash2, Download } from "lucide-react";
import type { Email, Attachment } from "../types";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface EmailViewProps {
  email: Email;
  onBack: () => void;
}

export function EmailView({ email, onBack }: EmailViewProps) {
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const handleAction = () => {
    alert("Error 500: Service Temporarily Unavailable");
  };

  const handleDownload = (attachment: Attachment) => {
    // If is #, use handleAction, and return
    if (attachment.url === "#") {
      handleAction();
      return;
    }
    // Really download the file
    const link = document.createElement("a");
    link.href = attachment.url;
    link.download = attachment.name;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    console.log("Fetching attachments for email:", email.id);
    const fetchAttachments = async () => {
      const { data, error } = await supabase.rpc("get_email_attachments", {
        email_uuid: email.id,
      });
      if (error) {
        console.error("Error fetching attachments:", error.message);
      } else {
        setAttachments(data);
      }
    };
    fetchAttachments();
  }, [email.id]);

  return (
    <div className="bg-white border border-[#CCCCCC]">
      <div className="bg-[#E5E5E5] p-2 border-b border-[#CCCCCC] flex gap-2">
        <button
          onClick={onBack}
          className="bg-[#F0F0F0] border border-[#999999] px-2 py-1 text-sm font-['Arial'] flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back
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
      </div>

      <div className="p-4">
        <table className="w-full border-collapse mb-4">
          <tbody>
            <tr>
              <td className="p-2 border border-[#CCCCCC] bg-[#E5E5E5] w-24 font-['Arial']">
                From:
              </td>
              <td className="p-2 border border-[#CCCCCC] font-['Arial']">
                {email.from}
              </td>
            </tr>
            <tr>
              <td className="p-2 border border-[#CCCCCC] bg-[#E5E5E5] w-24 font-['Arial']">
                To:
              </td>
              <td className="p-2 border border-[#CCCCCC] font-['Arial']">
                {/* email.to is a array of emails */}
                {email.to.join(", ")}
              </td>
            </tr>
            {email.cc && email.cc.length > 0 && (
              <tr>
                <td className="p-2 border border-[#CCCCCC] bg-[#E5E5E5] w-24 font-['Arial']">
                  CC:
                </td>
                <td className="p-2 border border-[#CCCCCC] font-['Arial']">
                  {email.cc.join(", ")}
                </td>
              </tr>
            )}
            <tr>
              <td className="p-2 border border-[#CCCCCC] bg-[#E5E5E5] font-['Arial']">
                Subject:
              </td>
              <td className="p-2 border border-[#CCCCCC] font-['Arial']">
                {email.subject}
              </td>
            </tr>
            <tr>
              <td className="p-2 border border-[#CCCCCC] bg-[#E5E5E5] font-['Arial']">
                Date:
              </td>
              <td className="p-2 border border-[#CCCCCC] font-['Arial']">
                {email.date}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="p-4 border border-[#CCCCCC] font-['Arial'] whitespace-pre-wrap mb-4">
          {email.body}
        </div>

        {attachments && attachments.length > 0 && (
          <div className="border border-[#CCCCCC]">
            <div className="bg-[#E5E5E5] p-2 font-['Arial'] text-sm border-b border-[#CCCCCC]">
              Attachments ({attachments.length})
            </div>
            <div className="p-2">
              {attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center gap-2 p-2 border border-[#CCCCCC] mb-2 last:mb-0"
                >
                  {attachment.type === "image" ? (
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="max-w-[200px] max-h-[150px] border border-[#CCCCCC]"
                    />
                  ) : (
                    <div className="flex items-center gap-2 font-['Arial'] text-sm">
                      <div className="bg-[#E5E5E5] p-2 border border-[#CCCCCC]">
                        PDF
                      </div>
                      <div>
                        <div>{attachment.name}</div>
                        <div className="text-xs text-[#666666]">
                          {attachment.size}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload(attachment)}
                        className="ml-auto flex items-center gap-1 text-[#003366] hover:underline"
                      >
                        <Download className="w-4 h-4" /> Download
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
