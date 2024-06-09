import { useEffect, useState } from 'react';
/*import './App.css';*/
import Board from './Left/Board';
import Feed from './Right/Feed';

function App() {

    return (
        <>
            <html className="scrollbar-thumb-slate-300 scrollbar-track-slate-700">
                <div className="flex">
                    <Board />
                    <Feed />
                </div>
            </html>
        </>
    );

}

export default App;