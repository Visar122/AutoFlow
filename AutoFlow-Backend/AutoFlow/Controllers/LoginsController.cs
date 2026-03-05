using Autoflow.Models;
using Autoflow.Models.Logins;
using AutoFlow.Models;
using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

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
           using var hmac = new HMACSHA512(); // laver random key(= salt)
            passwordSalt = hmac.Key;
            passwordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }
        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            using var hmac = new HMACSHA512(storedSalt); // bruger den gemte salt til at hashe det indtastede password
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)); // hasher det indtastede password med den gemte salt
            return computedHash.SequenceEqual(storedHash); // sammenligner det hashede indtastede password med det gemte hash
        }
        // GET: api/Logins
        [HttpPost("Logins")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _context.Logins.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            if (user == null)
                return NotFound(new { Message = "User not found." });

            if (!VerifyPasswordHash(loginDto.Password, user.PasswordHash, user.PasswordSalt)) ;

            return Ok(new { Message = "Login successful!", user.Name, user.Email, user.Status });

           /* - `loginDto.Password` = hvad brugeren indtastet som kode (plain text)
           - `user.PasswordHash` = den hashed kode   i DB
           - `user.PasswordSalt` = den99 random salt kode i DB
           */
        }

        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp([FromBody]SignUpDto signUpDto)
        {
            if(signUpDto == null)
                return BadRequest();

            // Check duplicate email
            var existing= await _context.Logins.FirstOrDefaultAsync(u=>u.Email == signUpDto.Email);
            if (existing != null)
                return Conflict(new { Message = "A user with this email already exists." });

            // Hash the password
            CreatePassworrdHash(signUpDto.Password, out byte[] Passwordhash, out byte[] Passwordsalt);

            var NewUser = new Logins
            {
                Name = signUpDto.Name,
                Email = signUpDto.Email,
                PasswordHash = Passwordhash,
                PasswordSalt = Passwordsalt,
                Status = signUpDto.Status
            };

            await _context.Logins.AddAsync(NewUser);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User added!" });
        }

    }
}
