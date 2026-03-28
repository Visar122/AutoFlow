using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Autoflow.Models;
using Autoflow.Models.Carshop;

namespace Autoflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarshopsController : ControllerBase
    {
        private readonly Dbcontext _context;

        public CarshopsController(Dbcontext context)
        {
            _context = context;
        }

        // GET: api/Carshops
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Carshop>>> GetCarshop()
        {
            return await _context.Carshop.ToListAsync();
        }

        // GET: api/Carshops/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Carshop>> GetCarshop(int id)
        {
            var carshop = await _context.Carshop.FindAsync(id);

            if (carshop == null)
            {
                return NotFound();
            }

            return carshop;
        }

        // PUT: api/Carshops/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarshop(int id, Carshop carshop)
        {
            if (id != carshop.CarId)
            {
                return BadRequest();
            }

            _context.Entry(carshop).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarshopExists(id))
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

        // POST: api/Carshops
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Carshop>> PostCarshop(Carshop carshop)
        {
            _context.Carshop.Add(carshop);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCarshop", new { id = carshop.CarId }, carshop);
        }

        // DELETE: api/Carshops/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarshop(int id)
        {
            var carshop = await _context.Carshop.FindAsync(id);
            if (carshop == null)
            {
                return NotFound();
            }

            _context.Carshop.Remove(carshop);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CarshopExists(int id)
        {
            return _context.Carshop.Any(e => e.CarId == id);
        }
    }
}
