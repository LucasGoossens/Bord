using Bord.Server.Models;
using Microsoft.AspNetCore.Mvc;
using static Bord.Server.DataAccessLayer.DAL;

namespace Bord.Server.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPost]
        [Route("/user/create")]
        public IActionResult CreateUser([FromBody] User user)
        {
            UserDAL userDAL = new UserDAL();
            userDAL.CreateUser(user);
            return Ok();
        }
    }
}
