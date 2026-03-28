using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Autoflow.Models;
using Autoflow.Models.ReserveParts;

namespace Autoflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservePartsController : ControllerBase
    {
        private readonly Dbcontext _context;

        public ReservePartsController(Dbcontext context)
        {
            _context = context;
        }

        // GET: api/ReserveParts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReserveParts>>> GetReserveParts()
        {
            return await _context.ReserveParts.ToListAsync();
        }

        // GET: api/ReserveParts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReserveParts>> GetReserveParts(int id)
        {
            var reserveParts = await _context.ReserveParts.FindAsync(id);

            if (reserveParts == null)
            {
                return NotFound();
            }

            return reserveParts;
        }

        // PUT: api/ReserveParts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReserveParts(int id, ReserveParts reserveParts)
        {
            if (id != reserveParts.Id)
            {
                return BadRequest();
            }

            _context.Entry(reserveParts).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservePartsExists(id))
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

        // POST: api/ReserveParts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ReserveParts>> PostReserveParts(ReserveParts reserveParts)
        {
            _context.ReserveParts.Add(reserveParts);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReserveParts", new { id = reserveParts.Id }, reserveParts);
        }

        // DELETE: api/ReserveParts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReserveParts(int id)
        {
            var reserveParts = await _context.ReserveParts.FindAsync(id);
            if (reserveParts == null)
            {
                return NotFound();
            }

            _context.ReserveParts.Remove(reserveParts);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReservePartsExists(int id)
        {
            return _context.ReserveParts.Any(e => e.Id == id);
        }
    }
}
