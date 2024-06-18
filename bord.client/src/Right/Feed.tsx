import FeedPost from "./FeedPost";
import Profile from "./Profile";

type User = {
    id: number;
    name: string;
    display: string;
};

type ProfileProps = {
    user: User;
};


function Feed({ user }: ProfileProps) {

    const test = new Array(10).fill(null);    
    //console.log(user)
    return (
        <div className="scrollbar-thin h-screen w-1/3 border-l-2 border-slate-700 border-inset bg-slate-800 text-gray-200 overflow-y-scroll">
            <Profile user={user} />

            {test.map((_, index) =>
                <FeedPost key={index} user={user} content={"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaashoowuuhmmmboo"} />
            )}
            
        </div>
    );
}

export default Feed;