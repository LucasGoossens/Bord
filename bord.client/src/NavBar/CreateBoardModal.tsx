import React from 'react';

interface CreateBoardModalProps {
    open: boolean;
    onClose: () => void;
}

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({ open, onClose }) => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);      
               

        fetch('https://localhost:7014/board/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: formData.get('name') })
        })
            .then(onClose())
            .catch(error => {
                console.log("Error", error)
            });


    }

    return (
        <>
            <div onClick={onClose} className={`text-white z-50 fixed inset-0 flex justify-center items-center ${open ? 'visible bg-black/70' : 'invisible'}`}>
                <div className="flex justify-center relative bg-slate-600 p-4 rounded shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
                    <button onClick={onClose} className="absolute right-2 top-2 px-2 py-1 bg-red-600 rounded hover:bg-red-500">Close</button>
                    <form onSubmit={handleSubmit}>
                        <label>
                            New board name: <br />
                            <input name="name" className="h-6 w-24 text-black" required />
                        </label><br />
                        <input type="submit" value="Submit" className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateBoardModal;
