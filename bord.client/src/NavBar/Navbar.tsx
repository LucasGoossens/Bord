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


    return (
        <>

            <div className="w-full h-14 flex justify-between pt-2 border border-slate-900 sticky top-0 h-10 bg-slate-700 text-slate-200 opacity-40 hover:opacity-100 hover:shadow-2xl transition-opacity">
                
                <div className="flex border border-rounded items-center px-1 mx-1">bord</div>
              
                  {/*  <svg onClick={() => setNav(!bigNav)} fill="#d4e1f7" height="75%" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.88 511.88" xml:space="preserve" stroke="#d4e1f7" stroke-width="19.963359"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.023762"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M248.36,263.428c4.16,4.16,10.88,4.16,15.04,0L508.733,18.095c4.053-4.267,3.947-10.987-0.213-15.04 c-4.16-3.947-10.667-3.947-14.827,0l-237.76,237.76L18.173,3.054C13.907-1.106,7.187-0.999,3.027,3.268 c-3.947,4.16-3.947,10.667,0,14.827L248.36,263.428z"></path> <path d="M508.627,248.388c-4.267-4.053-10.773-4.053-14.933,0l-237.76,237.76l-237.76-237.76 c-4.267-4.053-10.987-3.947-15.04,0.213c-3.947,4.16-3.947,10.667,0,14.827l245.333,245.333c4.16,4.16,10.88,4.16,15.04,0 L508.84,263.428C512.893,259.161,512.787,252.441,508.627,248.388z"></path> </g> </g> </g> </g></svg>               */}

                  <div className="flex">
                    <textarea className="w-80 px-4 text-black pt-1 border border-slate rounded-full h-4/5 mx-1 resize-none" placeholder="Search" />
                    <button className=" pb-2 rounded mx-1" onClick={openSelectBoardModal}>Q</button>
                </div>
                <div className="flex flex-end">
                {currentBoardId != 0 && <button className="border border-slate rounded mx-1" onClick={openCreateThreadModal}>Create</button>}
                    {/*{currentBoardId != 0 && }*/}
                        
                <button onClick={() => { localStorage.removeItem('user'); location.reload(); }} className="border border-slate rounded mx-1" >Log out</button>
                </div>              
                {/*<button className="border border-slate rounded mx-1" onClick={openCreateBoardModal}>Create New Board</button>*/}

                <CreateBoardModal open={createBoardModal} onClose={() => setCreateBoardModal(false)} />
                <CreateThread open={createThreadModal} onClose={() => setCreateThreadModal(false)} boardId={currentBoardId} />
                <SelectBoardModal open={selectBoardModal} onClose={() => setSelectBoardModal(false)} allBoards={allBoards} setBoard={setBoard} />

            </div>
        </>
    );
}

export default Navbar;