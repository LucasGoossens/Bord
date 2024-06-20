using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Bord.Server.DataAccessLayer.DAL;

namespace Bord.Server.Controllers
{
    [ApiController]
    public class FeedController : ControllerBase
    {
        [HttpGet]
        [Route("/feed/{id}")]
        public IActionResult getFeedById(int id)
        {
            try
            {
                FeedDAL feedDAL = new FeedDAL();
                return Ok(feedDAL.GetFeedById(id));
            }
            catch
            {
                return BadRequest();
            }

        }

        [HttpPost]
        [Route("/feed/create")]
        public IActionResult createFeed([FromBody] Models.FeedPost feedpost)
        {
            System.Diagnostics.Debug.WriteLine("Creating feed post");
            try
            {
                FeedDAL feedDAL = new FeedDAL();
                feedDAL.CreateFeedPost(feedpost);
            }
            catch
            {
                return BadRequest();
            }
            return Ok();
        }

    }
}
