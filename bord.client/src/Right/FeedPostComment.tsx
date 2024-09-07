import CommentProfile from "../Left/CommentProfile";

interface CommentProps {
    id: number;
    threadId: number;
    creatorId: number;
    content: string;
}

interface ThreadCommentProps {
    comment: CommentProps;
}


function FeedPostComment({ comment }: ThreadCommentProps) {
  return (
      <>
          <div className="p-2 border-t border-w-full border-slate-600 my-4">
              <CommentProfile creatorId={comment.creatorId} />
              <div className="ml-16 my-4">{comment.content}</div>

              <div className="flex flex-row justify-evenly border-t border-slate-700">
                  <button className="text-sm border border-slate-600 m-2 rounded-full px-2 hover:bg-slate-500">O</button>
                  <button className="ml-20 text-sm border border-slate-600 m-2 rounded-full px-2 hover:bg-slate-500">U</button>
                  <button className="ml-20 text-sm border border-slate-600 m-2 rounded-full px-2 hover:bg-slate-500">I</button>
                  <button className="ml-20 text-sm border border-slate-600 m-2 rounded-full px-2 hover:bg-slate-500">X</button>
              </div>
          </div>

      </>
  );
}

export default FeedPostComment;