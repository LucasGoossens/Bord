import React from 'react';
import { useState } from 'react';
import ThreadModal from './ThreadModal';
interface ThreadProps {    
    id: number,
    title: string,
    content: string,
    imgUrl: string,
    creatorId: number,
}

const Thread: React.FC<{ props: ThreadProps }> = ({ props }) => {
    const [threadModal, setModal] = useState(false);

    const openModal = () => {
        setModal(true);
    }


    return (
        <>
            <div onClick={openModal} className="flex flex-col m-1 my-6 h-2/5 w-1/5 border rounded-md border-slate-600 bg-slate-700 text-gray-200 shadow-xl hover:border-slate-400">
                <div className="flex pb-2 w-100 m-2 ml-3 border-b-2 border-slate-600 font-bold text-lg truncate">
                    <div className="w-8 h-8 mr-2 border rounded-full bg-slate-500 flex justify-center">{props.creatorId}</div>
                    {props.title}
                </div>
                <div className="flex justify-center">
                    {props.imgUrl ? <img src={props.imgUrl} alt="Random" className="w-11/12 mt-1 mx-2 rounded max-h-48" /> : <p>Loading...</p>}
                </div>
                <div className="overflow-hidden mx-2 max-h-fit h-1/2 py-2 border-b-2 border-slate-600 text-sm px-1">
                    {props.content}
                </div>
                <div className="flex flex-row justify-evenly">
                    <button className="text-sm border border-slate-600 m-2 rounded-full px-2 hover:bg-slate-500">O</button>
                    <button className="text-sm border border-slate-600 m-2 rounded-full px-2 hover:bg-slate-500">U</button>
                    <button className="text-sm border border-slate-600 m-2 rounded-full px-2 hover:bg-slate-500">I</button>
                    <button className="text-sm border border-slate-600 m-2 rounded-full px-2 hover:bg-slate-500">X</button>
                </div>
            </div>

            <ThreadModal threadId={props.id}  title={props.title} content={props.content} imgUrl={props.imgUrl} open={threadModal} creatorId={props.creatorId} onClose={() => setModal(false)} />
            
        </>
    );
}

export default Thread;
