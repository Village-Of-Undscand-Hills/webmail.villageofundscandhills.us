import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#E5E5E5] text-[#333333] p-4 text-xs font-['Arial'] border-t border-[#999999]">
      <div className="max-w-6xl mx-auto">
        <p className="mb-2">
          WARNING: This is a U.S. Government computer system, which may be accessed and used only for authorized Government business by authorized personnel. Unauthorized access or use of this computer system may subject violators to criminal, civil, and/or administrative action.
        </p>
        <p>
          All information on this computer system may be intercepted, recorded, read, copied, and disclosed by and to authorized personnel for official purposes, including criminal investigations. Such information includes sensitive data encrypted to comply with confidentiality and privacy requirements. Access or use of this computer system by any person, whether authorized or unauthorized, constitutes consent to these terms.
        </p>
      </div>
    </footer>
  );
}