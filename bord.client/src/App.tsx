import { useEffect, useState } from 'react';
/*import './App.css';*/
import Board from './Left/Board';
import Feed from './Right/Feed';
import Navbar from './NavBar/Navbar';

type User = {
    id: number;
    name: string;
    display: string;
};

type ProfileProps = {
    user: User;
};


function App() {
    const testUser: User = { "id": 1, "name": "test", "display": "test" };

    const [currentBoard, setBoard] = useState(0);    
    const [loggedInUser, setLogin] = useState<User | null>(testUser);

    const [allBoards, setAllBoards] = useState([]);


    useEffect(() => {
        setLogin(testUser);        
        
        const fetchBoards = async () => {
            try {
                const response = await fetch("https://localhost:7014/board/all", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setAllBoards(data);
                } else {
                    console.log("Failed to fetch boards", response.statusText);
                }
            } catch (error) {
                console.log("Error", error);
            }
        };

        fetchBoards();
    }, []);

    //useEffect(() => {
    //    console.log("current board: App.tsx", currentBoard);
        
    //}, [currentBoard])

return (
    <>
        <div className="scrollbar-thumb-slate-300 scrollbar-track-slate-700">
            <div className="flex">
                <Board boardId={currentBoard}>
                    <Navbar currentBoardId={currentBoard} allBoards={allBoards} setBoard={setBoard} />
                </Board >
                <Feed user={loggedInUser} />
            </div>
        </div>
    </>
);

}

export default App;