import { useState, useEffect } from "react";

function CommentProfile({ creatorId }) {
    const [commentProfile, setCommentProfile] = useState({});

    const fetchCommentProfile = (creatorId) => {
        fetch(`https://localhost:7014/user/${creatorId}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => setCommentProfile(data))
            .catch(error => console.log("Error", error));
    };

    useEffect(() => {
        fetchCommentProfile(creatorId);
    }, [creatorId]);

    return (
        <div>
            {commentProfile ? (
                <div className="flex flex-row">
                    <div className="w-10 h-10 ml-1 mr-4 mt-2 border rounded-full bg-slate-500 flex justify-center items-center">
                       {commentProfile.id}
                    </div>

                    <div className="flex flex-col my-1">
                        <div className="">
                            {commentProfile.display}
                        </div>

                        <div className="italic text-slate-400">
                            @{commentProfile.name}
                        </div>
                    </div>

                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default CommentProfile;
