import React from "react";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
// import FooterSmall from "components/Footers/FooterSmall.js";

export default function Auth({ children }) {
  return (
    <>
      {/* <Navbar transparent /> */}
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-full"
            style={{
              backgroundImage: "url('/img/black3.jpg')",
              backgroundSize: "105w 130vh"
            }}
          ></div>
          {children}
          {/* <FooterSmall absolute /> */}
        </section>
      </main>
    </>
  );
}
