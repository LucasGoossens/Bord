import React from 'react';
import { useState, useEffect } from 'react';
import ThreadComment from './ThreadComment';

interface ThreadModalProps {
    threadId: number;
    title: string;
    content: string;
    imgUrl: string;
    onClose: () => void;
    open: boolean;
}

interface CommentProps {
    id: number,
    threadId: number,
    creatorId: number,
    content: string
}

const ThreadModal: React.FC<ThreadModalProps> = ({ threadId, title, content, imgUrl, onClose, open, creatorId }) => {
    const [comments, setComments] = useState([]);


    const getComments = async () => {
        try {
            const response = await fetch(`https://localhost:7014/comment/${threadId}`, {
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
                console.error("Failed to fetch comments:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }


    const submitComment = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        fetch("https://localhost:7014/comment/create", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                threadId: threadId,
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
    };

    const deleteThread = () => {

        onClose();

        fetch(`https://localhost:7014/thread/delete/${threadId}`, {
            method: "DELETE"
        })
            .catch(error => console.error('Error:', error));


    }



    useEffect(() => {
        getComments()
        console.log(" teat, comments")
    }, [open]);

    return (
        <div onClick={onClose} className={`text-white z-50 fixed inset-0 flex justify-center items-center ${open ? 'visible bg-black/70 ' : 'invisible'}`}>
            <div className="bg-gray-800 p-4 rounded rounded-lg shadow-lg w-3/5 h-11/12 overflow-y-scroll overflow-x-hidden" onClick={(e) => e.stopPropagation()} >

                <div className="flex justify-between ">
                    <h2 className="text-xl ml-2 mb-4">{title}</h2>
                    <div className="">
                        {JSON.parse(localStorage.getItem('user')).id == creatorId &&
                            <button onClick={deleteThread} type="button" className="bg-red-800 p-2 border border-red-500 rounded hover:bg-red-500">DELETE</button>
                        }
                        <button onClick={onClose} className="m-4 px-4 py-2 bg-slate-600 rounded hover:bg-red-500">Close</button>
                    </div>
                </div>
                <div className="flex border-t border-b border-slate-600 m-1 py-3">
                    {imgUrl && <img src={imgUrl} alt="Thread" className="mx-2 w-1/3 h-1/3 mb-4 rounded" />}
                    <div className="p-2 text-md">{content}</div>
                </div>

                {comments.map((comment: CommentProps, index) => (
                    <ThreadComment key={index} comment={comment} />
                ))}



                <form onSubmit={submitComment} className="flex flex-col mt-5 mx-5 w-full">
                    <div className="flex items-start mb-4">
                        <div className="w-8 h-8 mr-5 mt-1 border rounded-full bg-slate-500 flex justify-center items-center">{JSON.parse(localStorage.getItem('user')).id}</div>
                        <textarea className="w-11/12 h-24 bg-slate-500 text-white p-2" name="comment" placeholder="Comment here..." maxLength="2000"></textarea>
                    </div>
                    <input type="submit" className="text-black self-start ml-16 m-4 px-4 py-2 bg-slate-200 rounded hover:bg-slate-100" value="Comment" />
                </form>

            </div>
        </div>
    );

}

export default ThreadModal;
