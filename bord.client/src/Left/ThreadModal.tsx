import React from 'react';

interface ThreadModalProps {
    title: string;
    content: string;
    imgUrl: string;
    onClose: () => void;
    open: boolean;
}

const ThreadModal: React.FC<ThreadModalProps> = ({ title, content, imgUrl, onClose, open }) => {
    return (
        <div onClick={onClose} className={`text-white z-50 fixed inset-0 flex justify-center items-center ${open ? 'visible bg-black/70 ' : 'invisible'}`}>
            <div className="bg-gray-800 p-4 rounded shadow-lg max-w-xl ">
                <h2 className="text-xl mb-4">{title}</h2>
                {imgUrl && <img src={imgUrl} alt="Thread" className="w-full mb-4 rounded" />}
                <p>{content}</p>
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-500">Close</button>
            </div>
        </div>
    );
}

export default ThreadModal;
