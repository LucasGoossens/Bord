function Thread({ imgUrl }) {

    return (
        <div className="flex flex-col m-4 h-2/5 w-1/5 border rounded-md border-slate-600 bg-slate-700 text-gray-200 shadow-xl">
            <div className="w-100 border-b-2 border-slate-600">
                title
            </div>
            <div>
                {imgUrl ? <img src={imgUrl} alt="Random" className="w-lvw rounded max-h-48"/> : <p>Loading...</p>}
            </div>
            <div className="overflow-hidden max-h-fit h-1/2 py-2 border-b-2 border-slate-600 text-sm px-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar lectus in orci dictum condimentum. Duis aliquam luctus dapibus. Fusce consequat arcu at vestibulum maximus. Ut tempus massa urna, eu congue nisi molestie ac. Praesent sodales magna sed mauris hendrerit, ut efficitur augue dictum. Vivamus euismod nulla sit amet dolor euismod cursus. Donec libero diam, luctus eleifend enim in, suscipit sollicitudin ligula. Aenean sit amet hendrerit arcu, sed posuere elit. In non pellentesque dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis mattis sed ex vel accumsan.</div>
            <div className="flex flex-row justify-evenly">
                <button className="text-sm border border-slate-600 mt-2 rounded-full px-2 hover:bg-slate-500">O</button>
                <button className="text-sm border border-slate-600 mt-2 rounded-full px-2 hover:bg-slate-500">U</button>
                <button className="text-sm border border-slate-600 mt-2 rounded-full px-2 hover:bg-slate-500">I</button>
                <button className="text-sm border border-slate-600 mt-2 rounded-full px-2 hover:bg-slate-500">X</button>
            </div>
        </div>
    );
}

export default Thread;
