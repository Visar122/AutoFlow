using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Autoflow.Models;
using Autoflow.Models.Booking;

namespace Autoflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly Dbcontext _context;

        public BookingsController(Dbcontext context)
        {
            _context = context;
        }

        // GET: api/Bookings
        [HttpGet("ThisWeek")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            var today = DateTime.Today;
            var startOfWeek = today.AddDays(-(int)today.DayOfWeek + (int)DayOfWeek.Monday);
            var endOfWeek = startOfWeek.AddDays(7);

            return await _context.Bookings
                .Where(b => b.BookingDate >= startOfWeek && b.BookingDate < endOfWeek)
                .ToListAsync();
        }
        [HttpGet("NextWeek")]
        public async Task<ActionResult<IEnumerable<Booking>>> NextWeekBooking()
        {
            var today = DateTime.Today;
            var startOfThisWeek = today.AddDays(-(int)today.DayOfWeek + (int)DayOfWeek.Monday);
            var startOfNextWeek = startOfThisWeek.AddDays(7);
            var endOfNextWeek = startOfNextWeek.AddDays(7);

            return await _context.Bookings
                .Where(b => b.BookingDate >= startOfNextWeek && b.BookingDate < endOfNextWeek)
                .ToListAsync();
        }

        [HttpGet("LastWeek")]
        public async Task<ActionResult<IEnumerable<Booking>>> LastWeekBooking()
        {
            var today = DateTime.Today;
            var startOfThisWeek = today.AddDays(-(int)today.DayOfWeek + (int)DayOfWeek.Monday);
            var startOfLastWeek = startOfThisWeek.AddDays(-7);

            return await _context.Bookings
                .Where(b => b.BookingDate >= startOfLastWeek && b.BookingDate < startOfThisWeek)
                .ToListAsync();
        }
        [HttpGet("ThisMonth")]
        public async Task<ActionResult<IEnumerable<Booking>>> ThisMonthBooking()
        {
            var today = DateTime.Today;
            var startOfThisMonth = new DateTime(today.Year, today.Month, 1);
               var startOfNextMonth = startOfThisMonth.AddMonths(1);  //AddMonths(1) tilføjer en måned så
                                                                      //Så hvis startOfThisMonth is 2026 - 03 - 01,AddMonths(1) giver 2026-04-01.

            return await _context.Bookings
                .Where(b => b.BookingDate >= startOfThisMonth && b.BookingDate < startOfNextMonth)
                .ToListAsync();
        }

        [HttpGet("LastMonth")]
        public async Task<ActionResult<IEnumerable<Booking>>> LastMonthBooking()
        {
            var today = DateTime.Today;
            var startOfLastMonth = new DateTime(today.Year, today.Month, 1).AddMonths(-1);
            var startOfThisMonth = new DateTime(today.Year, today.Month, 1);

            return await _context.Bookings
                .Where(b => b.BookingDate >= startOfLastMonth && b.BookingDate < startOfThisMonth)
                .ToListAsync();
        }

        [HttpGet ("GetByEmail")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookingsbyEmail(string Mail)
        {
            var booking = await _context.Bookings.Where(b=>b.CustomerEmail.ToLower() == Mail.ToLower()).ToListAsync();

            if (booking == null || !booking.Any())
            {
                return NotFound("No bookings found for this user.");
            }
            return Ok(booking);
        }
      

        // GET: api/Bookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        // PUT: api/Bookings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, Booking booking)
        {
            if (id != booking.Id)
            {
                return BadRequest();
            }

            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Bookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBooking", new { id = booking.Id }, booking);
        }

        // DELETE: api/Bookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookingExists(int id)
        {
            return _context.Bookings.Any(e => e.Id == id);
        }
    }
}
