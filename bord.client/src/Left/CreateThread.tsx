import React from 'react';
interface CreateThreadModalProps {
    open: boolean;
    onClose: () => void;
    boardId: number;
}


function CreateThread({ open, onClose, boardId }: CreateThreadModalProps) {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        console.log(JSON.stringify({
            title: formData.get("title"),
            content: formData.get("content"),
            boardId: boardId,
            creatorId: 1 // placeholder
        }))


        fetch("https://localhost:7014/thread/create", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: formData.get("title"),
                content: formData.get("content"),
                boardId: boardId,
                creatorId: 1 // placeholder
            })
        })
            .then(onClose())
            .catch(error => {
                console.log("Error", error)
            }
            )

    }

    return (
        <>
            <div onClick={onClose} className={`text-white z-50 fixed inset-0 flex justify-center items-center ${open ? 'visible bg-black/70' : 'invisible'}`}>
                <div className="w-1/4 flex m-2 justify-center relative bg-slate-600 p-4 rounded shadow-lg" onClick={(e) => e.stopPropagation()}>
                    <button onClick={onClose} className="absolute right-2 top-2 px-2 py-1 bg-red-600 rounded hover:bg-red-500">Close</button>
                    <form onSubmit={handleSubmit}>
                        <label className="mx-2">
                            Title <br />
                            <input name="title" className="h-6 mx-2 w-24 bg-slate-500 text-white" required />
                        </label><br />
                        <label >
                            OP<br />
                            <textarea
                                name="content"
                                className="h-40 w-96 bg-slate-500 text-white p-2 max-h-96"
                                required
                            ></textarea>

                        </label><br />
                        <input type="submit" value="Submit" className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500" />
                    </form>
                </div>
            </div>
        </>
    );

}

export default CreateThread;