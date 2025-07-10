import React from 'react';

export default function Navbar() {
  return (
    <>
      <div className="flex items-center w-full h-20 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <h1 className="text-white text-3xl px-20 flex">
          &lt; Pass
          <span className="text-green-600">OP</span>
          /&gt;
        </h1>
      </div>
    </>
  );
}
