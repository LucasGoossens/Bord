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
            //System.Diagnostics.Debug.WriteLine("hello");
            UserDAL userDAL = new UserDAL();
            userDAL.CreateUser(user);
            return Ok();
        }

        [HttpPost]
        [Route("/user/login")]
        
        public IActionResult LoginUser([FromBody] User user)
        {          
            UserDAL userDAL = new UserDAL();
            User loggedInUser = userDAL.ValidateLogin(user);
            if (loggedInUser != null)
            {
                System.Diagnostics.Debug.WriteLine(loggedInUser.Name);
                return Ok(loggedInUser);
            }
            return BadRequest();
        }

        [HttpGet]
        [Route("/user/{userId}")]
        public IActionResult GetUser(int userId)
        {
            UserDAL userDAL = new UserDAL();
            User user = userDAL.GetUserById(userId);
            if (user != null)
            {
                return Ok(user);
            }
            return BadRequest();
        }

    }
}
