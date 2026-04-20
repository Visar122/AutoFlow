using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Autoflow.Models;
using Autoflow.Models.Order;
using AutoFlow.Models;

namespace Autoflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly Dbcontext _context;

        public OrdersController(Dbcontext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder()
        {
            return await _context.Order.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Order.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder([FromBody] CreateOrderDto dto)
        {
            // Fake payment validation — always approves
            if (dto.Last4Digits.Length != 4)
                return BadRequest(new { message = "Invalid card." });

            var order = new Order
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                ItemId = dto.ItemId,
                ItemType = dto.ItemType,
                ItemName = dto.ItemName,
                Price = dto.Price,
                CardHolder = dto.CardHolder,
                Last4Digits = dto.Last4Digits,
                ExpiryDate = dto.ExpiryDate,
                Status = "Paid",
                OrderDate = DateTime.Now
            };

            _context.Order.Add(order);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Betaling godkendt", orderId = order.Id });
        }

        [HttpGet("ByEmail")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByEmail([FromQuery] string email)
        {
            var orders = await _context.Order
                .Where(o => o.Email.ToLower() == email.ToLower())
                .ToListAsync();
            return Ok(orders);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Order.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Order.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Order.Any(e => e.Id == id);
        }
    }
}
