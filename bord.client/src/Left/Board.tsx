import React, { useEffect, useState } from 'react';
import Thread from "./Thread";

function Board({ children, boardId }) {
    const [threadArr, setThreadArr] = useState([]);
    const [imgUrls, setImgUrls] = useState<string[]>([]);

    useEffect(() => {
        const fetchThreads = async () => {
            if (boardId === 0) {
                console.log("boardId == 0");
                return;
            }

            console.log("Fetching threads for board:", boardId);

            try {
                const response = await fetch(`https://localhost:7014/board/${boardId}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    console.error("Failed to fetch board data:", response);
                    return;
                }

                const data = await response.json();
                console.log("Board log:", data);

                if (!data) {
                    console.log(".");
                    return;
                }

                setThreadArr(data);
            } catch (error) {
                console.error("Error fetching boards:", error);
            }
        };

        fetchThreads();
    }, [boardId]);

    useEffect(() => {
        const fetchImageUrls = async () => {
            try {
                const response = await fetch("https://picsum.photos/v2/list");
                if (response.ok) {
                    const data = await response.json();
                    const urls = data.slice(0, threadArr.length).map(item => item.download_url);
                    setImgUrls(urls);
                } else {
                    console.error("Failed to fetch image URLs:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching image URLs:", error);
            }
        };

        fetchImageUrls();
    }, [threadArr.length]); // Depend on threadArr.length to trigger fetching new image URLs

    return (
        <div className="scrollbar-thin h-screen flex flex-row justify-evenly flex-wrap w-2/3 border-r-2 border-slate-700 border-inset bg-slate-800 overflow-y-scroll">
            {children}
            {imgUrls.length > 0 && threadArr.map((_, index) => {
                const threadProps = { ...threadArr[index], imgUrl: imgUrls[index] };
                return <Thread key={index} props={threadProps} />;
            })}
        </div>
    );
}

export default Board;
