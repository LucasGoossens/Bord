import { useState, useEffect } from "react";
import FeedPost from "./FeedPost";
import Profile from "./Profile";
import CreateFeedPost from "./CreateFeedPost";

type User = {
    id: number;
    name: string;
    display: string;
};

type ProfileProps = {
    user: User;
};


function Feed({ user }: ProfileProps) {
    const [posts, setPosts] = useState([])
    const [feedModal, setFeedModal] = useState(false)


    const getPosts = () => {
        fetch(`https://localhost:7014/feed/${user.id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPosts(data);
            })
            .catch(error => {
                console.log("Error", error);
            });
    };

    useEffect(() => {
        getPosts();
    }, []);


    const createFeedPost = () => {
        setFeedModal(true)
        getPosts();
    }

    return (
        <>
            <div className="scrollbar-thin h-screen w-1/3 border-l-2 border-slate-700 border-inset bg-slate-800 text-gray-200 overflow-y-scroll">
                <Profile user={user} />
                <button
                    onClick={createFeedPost}
                    className="z-40 shadow-xl opacity-40 absolute bottom-5 right-10 p-3 px-5 bg-sky-500 rounded-full text-xl font-bold hover:opacity-100"
                >
                    +
                </button>
                {posts.slice().reverse().map((post) => (
                    <FeedPost key={post.id} user={user} content={post.postContent} postId={post.id} />
                ))}
            </div>

            <CreateFeedPost open={feedModal} onClose={() => setFeedModal(false)} />
        </>
    );

}

export default Feed;