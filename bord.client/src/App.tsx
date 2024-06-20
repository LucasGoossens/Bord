import { useEffect, useState } from 'react';
/*import './App.css';*/
import Board from './Left/Board';
import Feed from './Right/Feed';
import Navbar from './NavBar/Navbar';
import Authorization from './Main/Authorization';

type User = {
    id: number;
    name: string;
    display: string;
};

type ProfileProps = {
    user: User;
};

function App() {
    const [currentBoard, setBoard] = useState(0);
    const [loggedInUser, setLogin] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [allBoards, setAllBoards] = useState([]);

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        fetch('https://localhost:7014/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: formData.get('name'), password: formData.get('password') })
        })
            .then(response => response.json())
            .then(data => {
                if (!data["name"]) {
                    return
                }                
                console.log(data);
                setLogin(data);
                localStorage.setItem('user', JSON.stringify(data));                
            })
            .catch(error => {
                console.log("Error", error);
            });
    };

    const handleRegistration = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        if (formData.get('password') !== formData.get('password-confirm')) {
            alert("Passwords do not match");
            return;
        }

        console.log("Registering", formData.get('name'), formData.get('password'));

        fetch('https://localhost:7014/user/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: formData.get('name'), password: formData.get('password'), display: formData.get('display') })
        })
            .catch(error => {
                console.log("Error", error);
            });
    };

    useEffect(() => {
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

    useEffect(() => {
        if (loggedInUser) {
            localStorage.setItem('user', JSON.stringify(loggedInUser));
        } else {
            localStorage.removeItem('user');
        }
    }, [loggedInUser]);

    return (
        <>
            {!loggedInUser ? (
                <Authorization handleLogin={handleLogin} handleRegistration={handleRegistration} />
            ) : (
                <div className="scrollbar-thumb-slate-300 scrollbar-track-slate-700">
                    <div className="flex">
                        <Board boardId={currentBoard}>
                            <Navbar currentBoardId={currentBoard} allBoards={allBoards} setBoard={setBoard} />
                        </Board>
                        <Feed user={loggedInUser} />
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
