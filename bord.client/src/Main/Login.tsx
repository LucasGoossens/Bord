function Login({backToMain, handleLogin}) {

    return (
        <>        
            <form onSubmit={handleLogin}>
                <label className="text-black" htmlFor="name">Username:</label><br />
                <input className="my-2 bg-slate-300 text-black" type="text" id="name" name="name" /><br />
                <label className="text-black"  htmlFor="password">Password:</label><br />
                <input className="my-2 bg-slate-300 text-black" type="password" id="password" name="password" /><br />
                <button className="border rounded-full w-full my-3 px-3 py-1 bg-slate-600" type="submit">Login</button>
                <div className="my-3 border border-slate-700"></div>
            <button type="button" className="border w-full my-3 px-3 py-1 bg-slate-700" onClick={backToMain} >Return</button>
            </form>
        
        </>

    );
}

export default Login;