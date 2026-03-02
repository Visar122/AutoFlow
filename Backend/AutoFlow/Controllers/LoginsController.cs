using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Autoflow.Models;
using Autoflow.Models.Logins;
using System.Security.Cryptography;
using System.Text;

namespace Autoflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginsController : ControllerBase
    {
        private readonly Dbcontext _context;

        public LoginsController(Dbcontext context)
        {
            _context = context;
        }
         
        private static void CreatePassworrdHash(string password,out byte[] passwordHash, out byte[] passwordSalt)
        {
           using var hmac = new HMACSHA3_512();
           passwordSalt = hmac.Key;
            passwordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }
        // GET: api/Logins
        [HttpGet("Logins")]
        public async Task<ActionResult<Logins>> Login([FromQuery] string email, [FromQuery] string password)
        {
            var user =await _context.Logins.FirstOrDefault(s=>s.Email == email&& s.PasswordSalt);
        }

    }
}
