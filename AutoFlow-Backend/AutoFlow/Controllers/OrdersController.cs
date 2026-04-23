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
using Stripe;

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

        [HttpPost("CreatePaymentIntent")]
        public async Task<IActionResult> CreatePaymentIntent([FromBody] CreatePaymentIntentDto dto)
        {
            StripeConfiguration.ApiKey = "sk_test_51TPQVOJSJ9176wqYrkdMMqyBHiBlevS43KlTb7REFI3HQHGPu5EeeAzGTTyfSu7SzLax6iPVX9VQSlbdQlfaSWms00iReYnE0Z";
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)(dto.Amount * 100),
                Currency = dto.Currency,
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions { Enabled = true }
            };
            var service = new PaymentIntentService();
            var intent = await service.CreateAsync(options);
            return Ok(new { clientSecret = intent.ClientSecret });
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
var order = new Order
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                ItemId = dto.ItemId,
                ItemType = dto.ItemType,
                ItemName = dto.ItemName,
                ImageUrl = dto.ImageUrl,
                Price = dto.Price,
                Status = "Paid",
                OrderDate = DateTime.Now
            };

            _context.Order.Add(order);

            // Decrement stock
            var part = await _context.ReserveParts.FindAsync(dto.ItemId);
            if (part != null && part.stock > 0)
                part.stock -= 1;

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
