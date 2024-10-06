import './App.css';
import React from 'react';
import { NextUIProvider } from "@nextui-org/react";
import NavComp from './components/NavComp';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import SessionState from './context/sessions/SessionState';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const notify = ()=>{
  toast.error('Something went wrong!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}

function App() {
  return (
    <>
      <SessionState notify={notify}>
        <NextUIProvider>
          <NavComp />
          <div
            className="flex overflow-hidden "
            style={{ height: `calc(100vh - 4.1rem)` }} // Adjusting for Navbar height
          >
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <main
              className="flex-1 p-2 overflow-y-auto transition-all duration-300 bg-indigo-50"
            >
              <Home />
            </main>
          </div>
        </NextUIProvider>
      </SessionState>
      <ToastContainer />
    </>
  );
}


export default App;
