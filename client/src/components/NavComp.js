import React, { useContext } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import SessionContext from '../context/sessions/SessionContext';


const NavComp = () => {
  const{currentSession} = useContext(SessionContext);
  return (
    <div>
      <Navbar isBordered>
        <NavbarBrand>
          <div className="font-semibold text-xl">
            {/* Apply the pacifico className to the desired text */}
            <span style={{ color: 'rgb(120, 40, 200)', fontFamily: "'Pacifico', sans-serif" }}>Chat</span>
            <span className="mx-1"></span>
            <span className="text-default-400">Sessions Dashboard</span>
          </div>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            {currentSession?<div className='flex justify-between'><div>{currentSession.icon}</div><div className='text-gray-600 font-bold ml-2 mt-2'>Session {currentSession.sessionId}</div></div>:''}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default NavComp;
