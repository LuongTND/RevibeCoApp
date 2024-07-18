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
    public class ProductCommentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductCommentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ProductComments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductComment>>> GetProductComments()
        {
          if (_context.ProductComments == null)
          {
              return NotFound();
          }
            return await _context.ProductComments.ToListAsync();
        }

        // GET: api/ProductComments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductComment>> GetProductComment(int id)
        {
          if (_context.ProductComments == null)
          {
              return NotFound();
          }
            var productComment = await _context.ProductComments.FindAsync(id);

            if (productComment == null)
            {
                return NotFound();
            }

            return productComment;
        }

        // PUT: api/ProductComments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductComment(int id, ProductComment productComment)
        {
            if (id != productComment.Id)
            {
                return BadRequest();
            }

            _context.Entry(productComment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductCommentExists(id))
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

        // POST: api/ProductComments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductComment>> PostProductComment(ProductComment productComment)
        {
          if (_context.ProductComments == null)
          {
              return Problem("Entity set 'ApplicationDbContext.ProductComments'  is null.");
          }
            _context.ProductComments.Add(productComment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductComment", new { id = productComment.Id }, productComment);
        }

        // DELETE: api/ProductComments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductComment(int id)
        {
            if (_context.ProductComments == null)
            {
                return NotFound();
            }
            var productComment = await _context.ProductComments.FindAsync(id);
            if (productComment == null)
            {
                return NotFound();
            }

            _context.ProductComments.Remove(productComment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductCommentExists(int id)
        {
            return (_context.ProductComments?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
