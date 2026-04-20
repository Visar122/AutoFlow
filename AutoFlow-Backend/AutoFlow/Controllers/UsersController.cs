using Autoflow.Models;
using Autoflow.Models.Logins;
using AutoFlow.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
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
    public class UsersController : ControllerBase
    {
        private readonly Dbcontext _context;

        public UsersController(Dbcontext context)
        {
            _context = context;
        }

        private static void CreatePassworrdHash(string password, out byte[] passwordSalt, out byte[] passwordHash)
        {
            using var hmac = new HMACSHA512(); // laver random key(= salt)
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }
        private static bool VerifyPasswordHash(string password, byte[] passwordSalt, byte[] passwordHash)
        {
            using var hmac = new HMACSHA512(passwordSalt); // bruger den gemte salt til at hashe det indtastede password
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)); // hasher det indtastede password med den gemte salt
            return computedHash.SequenceEqual(passwordHash); // sammenligner det hashede indtastede password med det gemte hash
        }
        // GET: api/Logins
        [HttpPost("Logins")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            if (user == null)
                return NotFound(new { Message = "User not found." });

            if (!VerifyPasswordHash(loginDto.Password, user.PasswordSalt, user.PasswordHash))
                return Unauthorized(new { Message = "Invalid password." });

            return Ok(new { user.FirstName, user.LastName, user.Email, user.Status, user.CarPlate, user.CarPlate2 });


        }

        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp([FromBody] SignUpDto signUpDto)
        {
            if (signUpDto == null)
                return BadRequest();

            // Check duplicate email
            var existing = await _context.Users.FirstOrDefaultAsync(u => u.Email == signUpDto.Email);
            if (existing != null)
                return Conflict(new { Message = "A user with this email already exists." });

            // Hash the password
            CreatePassworrdHash(signUpDto.Password, out byte[] Passwordsalt, out byte[] Passwordhash);

            var NewUser = new User
            {
                FirstName = signUpDto.FirstName,
                LastName = signUpDto.LastName,
                Email = signUpDto.Email,
                PasswordSalt = Passwordsalt,
                PasswordHash = Passwordhash,
                Status = signUpDto.Status,
                CarPlate =signUpDto.CarPlate,
                CarPlate2=signUpDto.CarPlate2,
               
            };

            await _context.Users.AddAsync(NewUser);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User added!" });
        }
        [HttpGet("GetMyInfo")]
        public async Task<IActionResult> GetMyInfo(string mail)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == mail);

            if(user == null)return NotFound( new{ Message = "User not found." });
            return Ok(new { user.FirstName,user.LastName,user.Email,user.CarPlate,user.CarPlate2});
        }

        [HttpPut("UpdateInfo")]
        public async Task<IActionResult> UpdateMyInfo([FromBody] UpdateUserDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null)
                return NotFound(new { Message = "User not found." });

            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.CarPlate = dto.CarPlate;
            user.CarPlate2 = dto.CarPlate2;

            if (!string.IsNullOrEmpty(dto.Password))
            {
                CreatePassworrdHash(dto.Password, out byte[] salt, out byte[] hash);
                user.PasswordSalt = salt;
                user.PasswordHash = hash;
            }

            await _context.SaveChangesAsync();
            return Ok(new { user.FirstName, user.LastName, user.Email, user.CarPlate, user.CarPlate2 });
        }
    }
}




