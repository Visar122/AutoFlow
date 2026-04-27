using Autoflow.Controllers;
using Autoflow.Models;
using Autoflow.Models.Logins;
using AutoFlow.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using Xunit;

namespace AutoFlow.Tests;

public class UsersControllerTests
{
    private Dbcontext CreateDb(string name)
    {
        var options = new DbContextOptionsBuilder<Dbcontext>()
            .UseInMemoryDatabase(name)
            .Options;
        return new Dbcontext(options);
    }

    private static (byte[] salt, byte[] hash) HashPassword(string password)
    {
        using var hmac = new HMACSHA512();
        return (hmac.Key, hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));
    }

    [Fact]
    public async Task Login_WrongPassword_ReturnsUnauthorized()
    {
        var db = CreateDb(nameof(Login_WrongPassword_ReturnsUnauthorized));
        var (salt, hash) = HashPassword("correctpassword");
        db.Users.Add(new User { Email = "test@test.com", FirstName = "Test", LastName = "User", Status = "user", CarPlate = "AB12345", PasswordSalt = salt, PasswordHash = hash });
        await db.SaveChangesAsync();

        var result = await new UsersController(db, null!).Login(new LoginDto { Email = "test@test.com", Password = "wrongpassword" });

        Assert.IsType<UnauthorizedObjectResult>(result);
    }

    [Fact]
    public async Task SignUp_NewUser_ReturnsOk()
    {
        var db = CreateDb(nameof(SignUp_NewUser_ReturnsOk));

        var result = await new UsersController(db, null!).SignUp(new SignUpDto
        {
            FirstName = "Visar", LastName = "Shabani",
            Email = "visar@test.com", Password = "password123",
            Status = "user", CarPlate = "AB12345"
        });

        Assert.IsType<OkObjectResult>(result);
        Assert.Equal(1, db.Users.Count());
    }

    [Fact]
    public async Task SignUp_DuplicateEmail_ReturnsConflict()
    {
        var db = CreateDb(nameof(SignUp_DuplicateEmail_ReturnsConflict));
        db.Users.Add(new User { Email = "visar@test.com", FirstName = "Visar", LastName = "Shabani", Status = "user", CarPlate = "AB12345", PasswordSalt = [], PasswordHash = [] });
        await db.SaveChangesAsync();

        var result = await new UsersController(db, null!).SignUp(new SignUpDto
        {
            FirstName = "Visar", LastName = "Shabani",
            Email = "visar@test.com", Password = "password123",
            Status = "user", CarPlate = "AB12345"
        });

        Assert.IsType<ConflictObjectResult>(result);
    }
}
