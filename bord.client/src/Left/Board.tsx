import React, { useState, useEffect } from 'react';
import Thread from "./Thread";

function Board({ children, boardId }) {
    const threadAmount = 3; 
    const threadArr = new Array(threadAmount).fill(null);   


    const ThreadPropsTest = {
        title: "test",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar lectus in orci dictum condimentum. Duis aliquam luctus dapibus. Fusce consequat arcu at vestibulum maximus. Ut tempus massa urna, eu congue nisi molestie ac. Praesent sodales magna sed mauris hendrerit, ut efficitur augue dictum. Vivamus euismod nulla sit amet dolor euismod cursus. Donec libero diam, luctus eleifend enim in, suscipit sollicitudin ligula. Aenean sit amet hendrerit arcu, sed posuere elit. In non pellentesque dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis mattis sed ex vel accumsan."
      
    };

    const [imgUrls, setImgUrls] = useState<string[]>([]);

    useEffect(() => {
        fetch("https://picsum.photos/v2/list")
            .then(response => response.json())
            .then(data => {
                const urls = data.slice(0, threadAmount).map(item => item.download_url);
                // als je hier dan pages zou maken, '0' in index variable veranderen
                // en dan data.slice(pageIndex, threadAmount).etc
                setImgUrls(urls);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="scrollbar-thin h-screen flex flex-row justify-evenly flex-wrap w-2/3 border-r-2 border-slate-700 border-inset bg-slate-800 overflow-y-scroll">
            {children}
            {imgUrls.length > 0 && threadArr.map((_, index) => {
                const threadProps = { ...ThreadPropsTest, imgUrl: imgUrls[index] };                
                return <Thread key={index} props={threadProps}/>
            })}
        </div>
    );
}

export default Board;
