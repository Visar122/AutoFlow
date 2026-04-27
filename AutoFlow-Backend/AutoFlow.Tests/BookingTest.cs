using Autoflow.Controllers;
using Autoflow.Models;
using Autoflow.Models.Booking;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace AutoFlow.Tests
{
    public class BookingTest
    {
        private Dbcontext CreateDatabase(string name)
        {
            var options = new DbContextOptionsBuilder<Dbcontext>()
                .UseInMemoryDatabase(name)
                .Options;
            return new Dbcontext(options);
        }

        [Fact]
        public async Task GetBooking_ExistingId_ReturnsBooking()
        {
            var db = CreateDatabase(nameof(GetBooking_ExistingId_ReturnsBooking));
            db.Bookings.Add(new Booking { Id = 1, CustomerName = "Visar", CustomerEmail = "visar@test.com", Tlf = "12345678", ServiceType = "Olieskift", CarPlate = "AB12345", BookingDate = DateTime.Today, BookingTime = TimeSpan.FromHours(10) });
            await db.SaveChangesAsync();

            var result = await new BookingsController(db, null!).GetBooking(1);

            var ok = Assert.IsType<ActionResult<Booking>>(result);
            Assert.Equal("Visar", ok.Value!.CustomerName);
        }

        [Fact]
        public async Task GetBooking_NonExistingId_ReturnsNotFound()
        {
            var db = CreateDatabase(nameof(GetBooking_NonExistingId_ReturnsNotFound));

            var result = await new BookingsController(db, null!).GetBooking(999);

            Assert.IsType<NotFoundResult>(result.Result);
        }
    }
}
