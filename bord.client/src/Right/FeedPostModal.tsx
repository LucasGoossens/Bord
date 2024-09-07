import { useState, useEffect } from "react";
import FeedPostComment from "./FeedPostComment";


type User = {
    id: number,
    name: string,
    display: string,

};

interface FeedPostModalProps {
    user: User,
    content: string
    postId: number
    onClose: () => void;
    open: boolean;
}

interface CommentProps {
    id: number,
    threadId: number,
    creatorId: number,
    content: string
}

function FeedPostModal({ user, content, postId, open, onClose }: FeedPostModalProps) {

    const [comments, setComments] = useState([]);
    const [openComments, setOpenComments] = useState(false);

    const getComments = async () => {
        try {
            const response = await fetch(`https://localhost:7014/feedpost/comment/get/${postId}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.json();
                setComments(data);

            } else {
                console.error("Failed to fetch feedpost comments:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching feedpost comments:", error);
        }
    }


    const submitComment = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        fetch("https://localhost:7014/feedpost/comment/create", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                feedpostId: postId,
                content: formData.get("comment"),
                creatorId: JSON.parse(localStorage.getItem('user')).id
            })
        })
            .then(response => response.json())
            .then(data => {
                //onClose();
                getComments();
            })
            .catch(error => {
                console.log("Error", error);
            });
    }


    useEffect(() => {
        getComments()
        console.log(" teat, comments")
    }, [open]);


    return (
        <div onClick={onClose} className={`text-white z-50 fixed inset-0 flex justify-center items-center ${open ? 'visible bg-black/70 ' : 'invisible'}`}>
            <div className="bg-gray-800 p-4 px-6 rounded rounded-lg shadow-lg w-3/5 h-5/6 overflow-y-scroll break-words" onClick={(e) => e.stopPropagation()} >

                <div className="flex flex-row">
                    <div className="w-10 h-10 ml-1 mr-4 mt-2 border rounded-full bg-slate-500 flex justify-center items-center">
                        {user.id}
                    </div>
                    <div className="flex flex-col">
                        <div>
                            {user.display}
                        </div>
                        <div className="italic text-slate-400">
                            @{user.name}
                        </div>
                    </div>
                </div>

                <div className="flex border-t border-b border-slate-600 m-1 mt-5 py-3">
                    {user.imgUrl && <img src={user.imgUrl} alt="Thread" className="mx-2 w-1/3 h-1/3 mb-4 rounded" />}
                    <div className="p-2 text-md">{content}</div>
                </div>

                <div className="flex justify-between border-b border-slate-600 w-full my-3 pb-3 px-3">
                    <button className="text-sm border border-slate-600 mt-2 rounded-full px-2 hover:bg-slate-500">O</button>
                    <button className="text-sm border border-slate-600 mt-2 rounded-full px-2 hover:bg-slate-500">U</button>
                    <button className="text-sm border border-slate-600 mt-2 rounded-full px-2 hover:bg-slate-500">I</button>
                    <button className="text-sm border border-slate-600 mt-2 rounded-full px-2 hover:bg-slate-500">X</button>
                </div>

                {openComments ?
                    <form onSubmit={submitComment} className="flex flex-col p-4 border rounded-lg mt-5 mx-5 w-3/5 bg-slate-600">
                        <div className="flex items-start ">
                            <div className="w-8 h-8 mr-5 mt-1 border rounded-full bg-slate-500 flex justify-center items-center">{JSON.parse(localStorage.getItem('user')).id}</div>
                            <textarea maxLength="300" className="w-11/12 h-44 bg-slate-600 border-y border-slate-800 text-white p-2" name="comment" placeholder="Comment here..."></textarea>
                        </div>
                        <input type="submit" className="text-white self-end ml-14 mt-2 px-4 py-2 bg-slate-600 rounded-full hover:bg-slate-100 hover:text-black" value="Comment" />
                    </form>
                    :
                    
                    <div onClick={() => setOpenComments(true)} className="flex my-3 mx-2 px-3 py-2 bg-slate-700 w-3/5 border border-slate-500 rounded-md justify-between hover:border-slate-100 ">
                        <div className="w-10 h-10  border rounded-full bg-slate-500 flex justify-center items-center">
                            {user.id}
                        </div>
                        <div className="p-2 px-3 border border-slate-500 rounded-lg " >Comment</div>
                    </div>
                    
                }
                

                {comments.map((comment: CommentProps, index) => (
                    <FeedPostComment key={index} comment={comment} />
                ))}

                <button type="button" onClick={onClose} className="m-4 px-4 py-2 bg-slate-600 rounded hover:bg-red-500">Close</button>
            </div>


        </div>
    );
}

export default FeedPostModal;