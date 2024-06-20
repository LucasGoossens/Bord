function Register({backToMain, handleRegistration }) {
  return (
      <>
    
          <form onSubmit={handleRegistration}>
          
              <label className="text-black font-semibold" htmlFor="name">Username:</label> <br/>
              <input className="my-2 text-black" type="text" id="name" name="name" /><br />
              <label className="text-black font-semibold" htmlFor="display">Display name [TEMPORARY]:</label> <br />
              <input className="my-2 text-black" type="text" id="display" name="display" /><br />
              <label className="text-black font-semibold" htmlFor="password">Password:</label><br />
              <input className="my-2 text-black" type="password" id="password" name="password" /><br />
              <label className="text-black font-semibold" htmlFor="password-confirm">Confirm Password:</label><br />
              <input className="my-2 text-black" type="password" id="password-confirm" name="password-confirm" /><br />
              <button className="border rounded-full w-full my-3 px-3 py-1 bg-slate-600" type="submit">Register</button>
              <div className="my-3 border border-slate-700"></div>
              <button type="button" className="border w-full my-3 px-3 py-1 bg-slate-700" onClick={backToMain} >Main</button>
              </form>
    

      </>
  );
}

export default Register;