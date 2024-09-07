using Bord.Server.Models;
using Microsoft.AspNetCore.Mvc;
using static Bord.Server.DataAccessLayer.DAL;

namespace Bord.Server.Controllers
{
    [ApiController]
    public class CommentController: ControllerBase
    {
        [HttpGet]
        [Route("/comment/{threadId}")]
        public IActionResult GetComments(int threadId)
        {
            CommentDAL commentDAL = new CommentDAL();
            System.Diagnostics.Debug.WriteLine("GetComments");
            return Ok(commentDAL.GetCommentByThreadId(threadId));
        }

        [HttpPost]
        [Route("/comment/create")]
        public IActionResult PostComment(Comment comment)
        {
            CommentDAL commentDAL = new CommentDAL();
            commentDAL.CreateThreadComment(comment);
            return Ok("Comment posted.");
        }

        [HttpPost]
        [Route("/feedpost/comment/create")]
        public IActionResult PostFeedPostComment(FeedPostComment comment)
        {
            CommentDAL commentDAL = new CommentDAL();
            commentDAL.CreateFeedPostComment(comment);
            return Ok("FeedPost Comment posted.");
        }

        [HttpGet]
        [Route("/feedpost/comment/get/{commentId}")]
        public IActionResult GetFeedPostComment(int commentId)
        {
            CommentDAL commentDAL = new CommentDAL();
            return Ok(commentDAL.GetFeedPostCommentsById(commentId));
        }
    }
}
