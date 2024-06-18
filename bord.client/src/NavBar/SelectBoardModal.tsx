interface SelectBoardModalProps {
    open: boolean;
    onClose: () => void;
    allBoards: any[];
    setBoard: (id: number) => void;
}

function SelectBoardModal({ open, onClose, allBoards, setBoard }: SelectBoardModalProps) {
    return (
        <div onClick={onClose} className={`text-white z-50 fixed inset-0 flex justify-center items-center ${open ? 'visible bg-black/70' : 'invisible'}`}>
            <div className="flex justify-center relative bg-slate-600 p-4 rounded shadow-lg w-96">
                {allBoards.length > 0 ? (
                    allBoards.map((board: any, index) => (
                        <button key={index} onClick={() => { setBoard(board.id); onClose(); }} className="border border-slate">
                            {board.name} {board.id}
                        </button>
                    ))
                ) : (
                    <div>No boards.</div>
                )}
            </div>
        </div>
    );
}

export default SelectBoardModal;
