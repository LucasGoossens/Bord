import React from 'react';
import { useState } from 'react';
import ThreadModal from './ThreadModal';
interface ThreadProps {    
    title: string,
    content: string,
    imgUrl: string
}

const Thread: React.FC<{ props: ThreadProps }> = ({ props }) => {
    const [threadModal, setModal] = useState(false);

    const openModal = () => {
        setModal(true);
    }


    return (
        <>
            <div onClick={openModal} className="flex flex-col m-1 my-6 h-2/5 w-1/5 border rounded-md border-slate-600 bg-slate-700 text-gray-200 shadow-xl">
                <div className="w-100 border-b-2 border-slate-600">
                    {props.title}
                </div>
                <div>
                    {props.imgUrl ? <img src={props.imgUrl} alt="Random" className="w-full rounded max-h-48" /> : <p>Loading...</p>}
                </div>
                <div className="overflow-hidden max-h-fit h-1/2 py-2 border-b-2 border-slate-600 text-sm px-1">
                    {props.content}
                </div>
                <div className="flex flex-row justify-evenly">
                    <button className="text-sm border border-slate-600 mt-2 rounded-full px-2 hover:bg-slate-500">O</button>
                    <button className="text-sm border border-slate-600 mt-2 rounded-full px-2 hover:bg-slate-500">U</button>
                    <button className="text-sm border border-slate-600 mt-2 rounded-full px-2 hover:bg-slate-500">I</button>
                    <button className="text-sm border border-slate-600 mt-2 rounded-full px-2 hover:bg-slate-500">X</button>
                </div>
            </div>
            {/* props zijn nu nog test data, maar beter gewoon ID meegeven en fetchen*/}
            <ThreadModal title={props.title} content={props.content} imgUrl={props.imgUrl} open={threadModal} onClose={() => setModal(false)} />
            
        </>
    );
}

export default Thread;
