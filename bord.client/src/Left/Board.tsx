import React, { useState, useEffect } from 'react';
import Thread from "./Thread";

function Board() {
    let threadAmount = 10;
    let pageNums = Math.ceil(threadAmount / 30);
    const threadArr = new Array(threadAmount).fill(null);

    const [imgUrls, setImgUrls] = useState([]);

    useEffect(() => {
        fetch("https://picsum.photos/v2/list?page=1&limit=100")
            .then(response => response.json())
            .then(data => {
                const urls = data.map(img => img.download_url);
                setImgUrls(urls);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <div className="scrollbar-thin h-screen flex justify-evenly flex-wrap w-2/3 border-r-2 border-slate-700 border-inset bg-slate-800 overflow-y-scroll">
                {threadArr.map((_, index) =>
                    <Thread key={index} imgUrl={imgUrls[index]} />
                )}
            </div>
        </>
    );
}

export default Board;
