using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize(Roles = "Admin,Admin2")]
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
        [Authorize(Roles = "Admin,Admin2")]
        [HttpPost]
        public async Task<ActionResult<ReserveParts>> PostReserveParts(ReserveParts reserveParts)
        {
            _context.ReserveParts.Add(reserveParts);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReserveParts", new { id = reserveParts.Id }, reserveParts);
        }
        [HttpGet("SearchParts")]
        public async Task<ActionResult<IEnumerable<ReserveParts>>> GetPartByName([FromQuery] string search)
        {
            var Parts=await _context.ReserveParts.Where(p => p.Name.ToLower().Contains(search.ToLower()) ||
            p.Category.ToLower().Contains(search.ToLower()) ||
            p.CarModel.ToLower().Contains(search.ToLower())).ToListAsync();
            return Ok(Parts);

        }
        [HttpGet("Filter")]
        public async Task<ActionResult<IEnumerable<ReserveParts>>>FilterParts(
            [FromQuery]string? name,
            [FromQuery] string? category,
            [FromQuery]string?carName,
            [FromQuery]string? carModel,
            [FromQuery] decimal? maxPrice)
        {
            var query =_context.ReserveParts.AsQueryable();

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(b => b.Name.ToLower().Contains(name.ToLower()));
            }
            
            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(b => b.Category.ToLower().Contains(category.ToLower()));
            }
            if (!string.IsNullOrEmpty(carName))
            {
                query = query.Where(b => b.CarName.ToLower().Contains(carName.ToLower()));
            }

            if (!string.IsNullOrEmpty(carModel))
            {
                query = query.Where(b => b.CarModel.ToLower().Contains(carModel.ToLower()));
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(b => b.Price <= maxPrice.Value);
            }

            var result = await query.ToListAsync();
            return Ok(result);
        }

        // DELETE: api/ReserveParts/5
        [Authorize(Roles = "Admin,Admin2")]
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
