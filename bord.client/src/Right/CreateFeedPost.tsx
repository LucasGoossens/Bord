function CreateFeedPost({ open, onClose }) {


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        console.log("Creating post", formData.get("content"));
        console.log("Creator", JSON.parse(localStorage.getItem('user')).id)
        
        fetch("https://localhost:7014/feed/create", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({        
                postcontent: formData.get("content"),                
                creatorId: JSON.parse(localStorage.getItem('user')).id
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
                        <label >
                            Content<br />
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

export default CreateFeedPost;