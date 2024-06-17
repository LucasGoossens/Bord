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

    }
}
