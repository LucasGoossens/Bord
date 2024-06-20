import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function Authorization({ handleLogin, handleRegistration }) {
    const [view, setView] = useState('main');

    const clickLogin = () => {
        setView('login');
    }

    const clickRegister = () => {
        setView('register');
    }

    const backToMain = () => {
        setView('main');
    }

    return (
        <>
            <div className="fixed inset-0 flex justify-center items-center bg-slate-800 h-full w-full z-50">
                <div className="flex flex-col justify-end items-center bg-slate-100 border border-slate-700 w-1/5 h-2/3 text-white shadow-xl">
                    {view === 'main' && (
                        <>
                            <button onClick={clickLogin} className="w-11/12 h-1/6 my-2 shadow-xl bg-slate-600 border rounded-xl text-xl text-white">Login</button>
                            <button onClick={clickRegister} className="w-11/12 h-1/6 mb-10 shadow-xl bg-slate-800 border rounded-xl text-xl text-white">Register</button>
                        </>

                    )}

                    {view === 'login' && <Login backToMain={backToMain} handleLogin={handleLogin} />}
                    {view === 'register' && <Register backToMain={backToMain} handleRegistration={handleRegistration} />}
                </div>

            </div>
        </>
    );
}

export default Authorization;
