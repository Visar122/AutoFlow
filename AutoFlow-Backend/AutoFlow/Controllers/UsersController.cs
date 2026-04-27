using Autoflow.Models;
using Autoflow.Models.Logins;
using AutoFlow.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
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
        private readonly IConfiguration _config;

        public UsersController(Dbcontext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim("email", user.Email),
                new Claim("role", user.Status),
                new Claim("firstName", user.FirstName),
                new Claim("lastName", user.LastName),
                new Claim("carPlate", user.CarPlate ?? ""),
                new Claim("carPlate2", user.CarPlate2 ?? "")
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
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

            var token = GenerateJwtToken(user);
            return Ok(new { token, user.FirstName, user.LastName, user.Email, user.Status, user.CarPlate, user.CarPlate2 });


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
                Status = "user",
                CarPlate =signUpDto.CarPlate,
                CarPlate2=signUpDto.CarPlate2,
               
            };

            await _context.Users.AddAsync(NewUser);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User added!" });
        }
        [Authorize]
        [HttpGet("GetMyInfo")]
        public async Task<IActionResult> GetMyInfo(string mail)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == mail);

            if(user == null)return NotFound( new{ Message = "User not found." });
            return Ok(new { user.FirstName,user.LastName,user.Email,user.CarPlate,user.CarPlate2});
        }

        [Authorize(Roles = "Admin,Admin2")]
        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users.Select(u => new { u.FirstName, u.LastName, u.Email, u.CarPlate, u.CarPlate2, u.Status }).ToListAsync();
            return Ok(users);
        }

        [Authorize(Roles = "Admin,Admin2")]
        [HttpGet("SearchUsers")]
        public async Task<IActionResult> SearchUsers([FromQuery] string search)
        {
            var users = await _context.Users
                .Where(u => u.FirstName.ToLower().Contains(search.ToLower()) ||
                            u.LastName.ToLower().Contains(search.ToLower()) ||
                            u.Email.ToLower().Contains(search.ToLower()) ||
                            (u.FirstName.ToLower() + " " + u.LastName.ToLower()).Contains(search.ToLower()))
                .Select(u => new { u.FirstName, u.LastName, u.Email, u.CarPlate, u.CarPlate2, u.Status })
                .ToListAsync();
            return Ok(users);
        }


        [Authorize(Roles = "Admin")]
        [HttpPut("UpdateStatus")]
        public async Task<IActionResult> UpdateStatus([FromBody] UpdateStatusDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null) return NotFound();
            user.Status = dto.Status;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUser([FromQuery] string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return NotFound();
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [Authorize]
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

        [HttpPost("CreateAdmin")]
        public async Task<IActionResult> CreateAdmin([FromBody] SignUpDto signUpDto)
        {
            if (signUpDto == null)
                return BadRequest();


            var existing = await _context.Users.FirstOrDefaultAsync(u => u.Email == signUpDto.Email);
            if (existing != null)
                return Conflict(new { Message = "A user with this email already exists." });


            CreatePassworrdHash(signUpDto.Password, out byte[] Passwordsalt, out byte[] Passwordhash);


            var NewUser = new User
            {
                FirstName = signUpDto.FirstName,
                LastName = signUpDto.LastName,
                Email = signUpDto.Email,
                PasswordSalt = Passwordsalt,
                PasswordHash = Passwordhash,
                Status = signUpDto.Status ?? "Admin",
                CarPlate = signUpDto.CarPlate,
                CarPlate2 = signUpDto.CarPlate2,
            };


            await _context.Users.AddAsync(NewUser);
            await _context.SaveChangesAsync();


            return Ok(new { Message = "Admin created!" });
        }



    }
}




