import { useEffect, useState } from 'react';
import CreateBoardModal from './CreateBoardModal';
import CreateThread from '../Left/CreateThread';
import SelectBoardModal from './SelectBoardModal';
function Navbar({ currentBoardId, allBoards, setBoard }) {
    const [bigNav, setNav] = useState(false);
    const [createBoardModal, setCreateBoardModal] = useState(false);
    const [createThreadModal, setCreateThreadModal] = useState(false);
    const [selectBoardModal, setSelectBoardModal] = useState(false);

    const openCreateBoardModal = () => {
        setCreateBoardModal(true)
    }

    const openCreateThreadModal = () => {
        setCreateThreadModal(true)
    }

    const openSelectBoardModal = () => {
        setSelectBoardModal(true)
    }

    const onClickStr = bigNav ? "h-20 z-10 opacity-100" : "";
    const buttonText = bigNav ? "Close" : "Open";

    return (
        <>

            <div className={`w-full flex border border-slate-900 sticky top-0 h-10 bg-slate-700 text-slate-200 justify-center shadow-2xl opacity-60 hover:opacity-100 ${onClickStr}`}>
                <div>{currentBoardId}</div>
                <button className="max-h-10 border rounded-lg bg-sky-100 text-black px-10 mx-10" onClick={() => setNav(!bigNav)}>{buttonText}</button>
             
                {bigNav &&
                    <>
                    <button className="border border-slate rounded mx-1" onClick={openCreateBoardModal}>Create New Board</button>
                    <button className="border border-slate rounded mx-1" onClick={openCreateThreadModal}>Create New Thread</button>
                    <button className="border border-slate rounded mx-1" onClick={openSelectBoardModal}>Select Board</button>

                    </>
                }
             
                <CreateBoardModal open={createBoardModal} onClose={() => setCreateBoardModal(false)} />
                <CreateThread open={createThreadModal} onClose={() => setCreateThreadModal(false)} boardId={currentBoardId} />
                <SelectBoardModal open={selectBoardModal} onClose={() => setSelectBoardModal(false)} allBoards={allBoards} setBoard={setBoard} />

            </div>
        </>
    );
}

export default Navbar;