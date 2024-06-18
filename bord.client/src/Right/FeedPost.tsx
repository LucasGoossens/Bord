type User = {
    id: number,
    name: string,
    display: string,    
};

type FeedProps = {
    user: User;
    content:string
};


function FeedPost({ user, content }: FeedProps) {
    return (
        <div className="relative grid grid-cols-[10%_90%] border min-h-24 h-fit border-slate-700">
            <div className="flex items-start pt-5 justify-center">
                <img
                    className="w-12 h-12 max-w-fit max-h-fit rounded-full border-2 border-slate-600"
                    src="https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ"
                />
            </div>
            <div className="p-3 overflow-hidden break-words">
                <div className="font-bold text-md flex flex-row">{user.name }
                    <div className="italic px-1 font-sm text-sm text-slate-400">@{user.display}</div>
                    </div>
                <div>{content}</div>
                <div className="flex justify-between border-t border-slate-600 w-full my-1">
                    <button className="text-sm border border-slate-600 mt-2 rounded-full px-2 hover:bg-slate-500">O</button>
                    <button className="text-sm border border-slate-600 mt-2 rounded-full px-2 hover:bg-slate-500">U</button>
                    <button className="text-sm border border-slate-600 mt-2 rounded-full px-2 hover:bg-slate-500">I</button>
                    <button className="text-sm border border-slate-600 mt-2 rounded-full px-2 hover:bg-slate-500">X</button>
                </div>
            </div >
        </div >
    );
}

export default FeedPost;
