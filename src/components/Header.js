import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MdOutlineTableChart } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import UAuth from "@uauth/js";

export default function Header() {

 
const uauth = new UAuth({
  clientID: "4569342c-6256-4e0a-ae61-63f59122dff8",
  redirectUri: "https://blockcharts.vercel.app/dashboard",
  scope: "openid wallet email profile:optional social:optional"
});

useEffect(() => {
  // setUserWallet("Login With Unstoppable")
  uauth
    .user()
    .then((user) => {
      setUserWallet(user.sub);
      // user exists
      console.log("User information:", user);
    })
    .catch((err) => {
      console.log(err);
      // user does not exist
    });
}, []);

const login = async () => {
  try {
    const authorization = await uauth.loginWithPopup();
    uauth.user().then((user) => {
      setUserWallet(user.sub);
      // user exists
      console.log("User information:", user);
    });
    // setUserWallet(authorization.sub)
    // window.location.reload();
    console.log(authorization);
  } catch (error) {
    console.error(error);
  }
};

  const [userWallet, setUserWallet] = useState(null);

   const logout = async () => {
     try {
       await uauth.logout();

       setUserWallet(null);
     } catch (error) {
       console.error(error);
     }
   };

  return (
    <header className="border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <MdOutlineTableChart className="w-10 h-10" />
            <span className="font-large">BlockCharts</span>
          </a>
          <div className="w-inherit py-6 flex items-center justify-between">
          <div className="ml-10 space-x-4"><ConnectButton /></div>
          <div className="ml-10 space-x-4"  onClick={() => {userWallet ? logout() : login()}}
                class="text-gray-800 ml-5px cursor-pointer dark:text-black hover:bg-purple-600 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                {userWallet ? userWallet : "Login With Unstoppable"}</div>
          </div>
          
        </div>
        
      </nav>
    </header>
  );
}
