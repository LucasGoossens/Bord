import { useState } from 'react';
import CreateBoardModal from './CreateBoardModal';
function Navbar({ currentBoardId }) {
    const [bigNav, setNav] = useState(false);
    const [createModal, setCreateModal] = useState(false);

    const openModal = () => {
        setCreateModal(true)
    }

    const onClickStr = bigNav ? "h-20 z-10 opacity-100" : "";
    const buttonText = bigNav ? "Close" : "Open";


    return (
        <>

            <div className={`w-full flex border border-slate-900 sticky top-0 h-10 bg-slate-700 text-slate-200 justify-center shadow-2xl opacity-60 hover:opacity-100 ${onClickStr}`}>
                <div>{currentBoardId}</div>
                <button className="max-h-10 border rounded-lg bg-sky-100 text-black px-10 mx-10" onClick={() => setNav(!bigNav)}>{buttonText}</button>

                {bigNav &&
                    <button onClick={openModal}>Create Board</button>
                }
             
                <CreateBoardModal open={createModal} onClose={() => setCreateModal(false)} />

            </div>
        </>
    );
}

export default Navbar;