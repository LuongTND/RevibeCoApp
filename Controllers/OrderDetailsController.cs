using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcomerceApp.Data;
using EcomerceApp.Models;

namespace EcomerceApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderDetailsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/OrderDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetOrderDetails(
            int? page = 1, 
            int? pageSize = 10, 
            string orderBy = "Id", 
            bool descending = false)
        {
            if (page == null || pageSize == null || page <= 0 || pageSize <= 0)
            {
                return BadRequest("Invalid page or pageSize value.");
            }

            var query = from detail in _context.OrderDetails
                        select new
                        {
                            detail.Id,
                            detail.Quantity,
                            detail.UnitPrice,
                            Order = (from order in _context.Orders
                                     where order.Id == detail.OrderId
                                     select new
                                     {
                                         order.Id,
                                         order.OrderDate,
                                         User = (from user in _context.Users
                                                 where user.Id == order.UserId
                                                 select new
                                                 {
                                                     user.Id,
                                                     user.UserName
                                                 }).FirstOrDefault()
                                     }).FirstOrDefault(),
                            Product = (from product in _context.Products
                                       where product.Id == detail.ProductId
                                       select new
                                       {
                                           product.Id,
                                           product.Name,
                                           product.Price
                                       }).FirstOrDefault()
                        };

            // Apply sorting
            switch (orderBy.ToLower())
            {
                case "quantity":
                    query = descending ? query.OrderByDescending(d => d.Quantity) : query.OrderBy(d => d.Quantity);
                    break;
                case "unitprice":
                    query = descending ? query.OrderByDescending(d => d.UnitPrice) : query.OrderBy(d => d.UnitPrice);
                    break;
                case "orderdate":
                    query = descending ? query.OrderByDescending(d => d.Order.OrderDate) : query.OrderBy(d => d.Order.OrderDate);
                    break;
                case "productname":
                    query = descending ? query.OrderByDescending(d => d.Product.Name) : query.OrderBy(d => d.Product.Name);
                    break;
                default:
                    query = descending ? query.OrderByDescending(d => d.Id) : query.OrderBy(d => d.Id);
                    break;
            }

            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize.Value);

            var results = await query
                .Skip((page.Value - 1) * pageSize.Value)
                .Take(pageSize.Value)
                .ToListAsync();

            return Ok(new { TotalCount = totalCount, TotalPages = totalPages, Results = results });
        }

        // GET: api/OrderDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetOrderDetail(int id)
        {
            if (_context.OrderDetails == null)
            {
                return NotFound();
            }

            var detail = await _context.OrderDetails
                .Include(od => od.Order)
                .ThenInclude(o => o.User)
                .Include(od => od.Product)
                .Where(od => od.Id == id)
                .Select(od => new
                {
                    od.Id,
                    od.Quantity,
                    od.UnitPrice,
                    Order = new
                    {
                        od.Order.Id,
                        od.Order.OrderDate,
                        User = new { od.Order.User.Id, od.Order.User.UserName }
                    },
                    Product = new
                    {
                        od.Product.Id,
                        od.Product.Name,
                        od.Product.Price
                    }
                })
                .FirstOrDefaultAsync();

            if (detail == null)
            {
                return NotFound();
            }

            return detail;
        }

        // PUT: api/OrderDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderDetail(int id, OrderDetail detail)
        {
            if (id != detail.Id)
            {
                return BadRequest();
            }

            _context.Entry(detail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderDetailExists(id))
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

        // POST: api/OrderDetails
        [HttpPost]
        public async Task<ActionResult<OrderDetail>> CreateOrderDetail(OrderDetail detail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.OrderDetails.Add(detail);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
            return CreatedAtAction(nameof(GetOrderDetail), new { id = detail.Id }, detail);
        }

        // DELETE: api/OrderDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderDetail(int id)
        {
            if (_context.OrderDetails == null)
            {
                return NotFound();
            }
            var detail = await _context.OrderDetails.FindAsync(id);
            if (detail == null)
            {
                return NotFound();
            }

            _context.OrderDetails.Remove(detail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderDetailExists(int id)
        {
            return (_context.OrderDetails?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
