import FeedPost from "./FeedPost";
import Profile from "./Profile";

function Feed() {
    const test = new Array(10).fill(null);

    return (
        <div className="scrollbar-thin h-screen w-1/3 border-l-2 border-slate-700 border-inset bg-slate-800 text-gray-200 overflow-y-scroll">
            <Profile />

            {test.map((_, index) =>
                <FeedPost key={index} name={"test"} display={"test"} content={"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaashoowuuhmmmboo"} />
            )}
            
        </div>
    );
}

export default Feed;