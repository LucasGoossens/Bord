using Bord.Server.DataAccessLayer;
using Bord.Server.Models;
using Microsoft.AspNetCore.Mvc;
using static Bord.Server.DataAccessLayer.DAL;

namespace Bord.Server.Controllers
{
    [ApiController]
    public class BoardController : ControllerBase
    {
        [HttpPost]
        [Route("/board/create")]
        public IActionResult CreateBoard([FromBody] Board board)
        {
            try
            {
                //System.Diagnostics.Debug.WriteLine(board.Name);                
                BoardDAL boardDAL = new BoardDAL();
                boardDAL.CreateBoard(board);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }

        }

        [HttpGet]
        [Route("/board/all")]
        public IActionResult GetAllBoards()
        {
            BoardDAL boardDAL = new BoardDAL();
            return Ok(boardDAL.GetAllBoards());
        }

        [HttpGet]
        [Route("/board/{id}")]
        public IActionResult GetThreadsByBoardId(int id)
        {
            ThreadDAL threadDAL = new ThreadDAL();
            return Ok(threadDAL.GetAllThreadsByBoardId(id));
        }

    }
}
