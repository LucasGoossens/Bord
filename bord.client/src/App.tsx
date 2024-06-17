import { useEffect, useState } from 'react';
/*import './App.css';*/
import Board from './Left/Board';
import Feed from './Right/Feed';
import Navbar from './NavBar/Navbar';

function App() {
    const [currentBoard, setBoard] = useState(0);

    return (
        <>
            <html className="scrollbar-thumb-slate-300 scrollbar-track-slate-700">
                <div className="flex">
                    <Board boardId={currentBoard }>
                        <Navbar currentBoardId={currentBoard} />
                    </Board >

                    <Feed />
                </div>
            </html>
        </>
    );

}

export default App;