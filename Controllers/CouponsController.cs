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
    public class CouponsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CouponsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Coupons
        // GET: api/Coupons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Coupon>>> GetCoupons(
            int? page = 1,
            int? pageSize = 10,
            string orderBy = "Id",
            bool descending = false)
        {
            if (page == null || pageSize == null || page <= 0 || pageSize <= 0)
            {
                return BadRequest("Invalid page or pageSize value.");
            }

            var query = _context.Coupons.AsQueryable();

            // Apply sorting
            switch (orderBy.ToLower())
            {
                case "code":
                    query = descending ? query.OrderByDescending(c => c.Code) : query.OrderBy(c => c.Code);
                    break;
                case "status":
                    query = descending ? query.OrderByDescending(c => c.Status) : query.OrderBy(c => c.Status);
                    break;
                default:
                    query = descending ? query.OrderByDescending(c => c.Id) : query.OrderBy(c => c.Id);
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

        // GET: api/Coupons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Coupon>> GetCoupon(int id)
        {
            if (_context.Coupons == null)
            {
                return NotFound();
            }
            var coupon = await _context.Coupons.FindAsync(id);

            if (coupon == null)
            {
                return NotFound();
            }

            return coupon;
        }

        // PUT: api/Coupons/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCoupon(int id, Coupon coupon)
        {
            if (id != coupon.Id)
            {
                return BadRequest();
            }

            _context.Entry(coupon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CouponExists(id))
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

        // POST: api/Coupons
        [HttpPost]
        public async Task<ActionResult<Coupon>> CreateCoupon(Coupon coupon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Coupons.Add(coupon);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetCoupon), new { id = coupon.Id }, coupon);
        }

        // DELETE: api/Coupons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoupon(int id)
        {
            if (_context.Coupons == null)
            {
                return NotFound();
            }
            var coupon = await _context.Coupons.FindAsync(id);
            if (coupon == null)
            {
                return NotFound();
            }

            coupon.IsDeleted = true; // Đánh dấu mã giảm giá là đã bị xoá
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/Coupons/5/status
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateCouponStatus(int id, [FromBody] bool status)
        {
            var coupon = await _context.Coupons.FindAsync(id);
            if (coupon == null)
            {
                return NotFound();
            }

            coupon.Status = status;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // GET: api/Coupons/search
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Coupon>>> SearchCoupons(string code)
        {
            if (string.IsNullOrEmpty(code))
            {
                // If the code is null or empty, return BadRequest
                return BadRequest("Code is required.");
            }

            // Filter the list of coupons based on the code
            var coupons = await _context.Coupons.FirstOrDefaultAsync(c => code == c.Code);
                

            // Check if any coupons are found
            if (coupons == null)
            {
                // If no coupons are found, return NotFound
                return NotFound("No coupons found matching the code.");
            }

            return Ok(coupons);
        }

        private bool CouponExists(int id)
        {
            return (_context.Coupons?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
