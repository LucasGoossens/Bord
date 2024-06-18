type User = {
    id: number;
    name: string;
    display: string;
};

type ProfileProps = {
    user: User;
};

function Profile({ user }: ProfileProps) {
    return (
        <div className="flex flex-col relative min-w-max max-w-full border-b-2 border-slate-500 h-96">
            <div className="w-full border border-gray-700 bg-slate-700 h-1/3">

            </div>
            {/*<img className="w-full border border-gray-700 h-1/3" src="https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ" />*/}
            <img className="absolute left-4 top-7 w-32 h-32 rounded-full content-center border border-slate-600 border-2" src="https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ" />
            <div className="w-full border border-gray-700 bg-slate-900 px-8 pt-10 h-2/3">
                <div className="font-bold">{user.name}</div>
                <div className="italic text-slate-400">@{user.display}</div>
                <div className="py-5">Description or bio lorem etc etc ec</div>
                <div className="flex flex-row">
                    <div className="px-1 pt-2 text-sm font-bold hover:text-sky-500">Following 999</div>
                    <div className="px-3 pt-2 text-sm font-bold hover:text-sky-500">Followers 999k</div>
                </div>
                <div className="my-10 flex flex-row">
                    <button className="px-6 hover:bg-slate-800">text</button>
                    <button className="px-6 hover:bg-slate-800">text</button>
                    <button className="px-6 hover:bg-slate-800">text</button>
                    <button className="px-6 hover:bg-slate-800">text</button>
                    <button className="px-6 hover:bg-slate-800">text</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;