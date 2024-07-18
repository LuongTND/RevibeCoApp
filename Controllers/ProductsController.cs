using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcomerceApp.Data;
using EcomerceApp.Models;
using System.Net.NetworkInformation;
using EcomerceApp.DTOs;
using EcommerceApp.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;

namespace EcomerceApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetProducts(
            int? page = 1,
            int? pageSize = 10,
            string orderBy = "Id",
            bool descending = false)
        {
            if (page == null || pageSize == null || page <= 0 || pageSize <= 0)
            {
                return BadRequest("Invalid page or pageSize value.");
            }

            var query = from product in _context.Products
                        join category in _context.ProductCategories on product.ProductCategoryId equals category.Id into productCategoryGroup
                        from pc in productCategoryGroup.DefaultIfEmpty()
                        select new
                        {
                            product,
                            product.Id,
                            product.Name,
                            product.Description,
                            product.Price,
                            ProductCategoryName = pc != null ? pc.Name : null,
                            Comments = (from comment in _context.ProductComments
                                        join user in _context.Users on comment.UserId equals user.Id
                                        where comment.ProductId == product.Id
                                        select new
                                        {
                                            comment.Id,
                                            comment.Content,
                                            comment.CreatedAt,
                                            User = new { user.Id, user.UserName }
                                        }).Distinct().ToList(),
                            Images = (from image in _context.ProductImages
                                      where image.ProductId == product.Id
                                      select new
                                      {
                                          image.Id,
                                          image.ImageUrl
                                      }).Distinct().ToList()
                        };

            // Apply sorting
            switch (orderBy.ToLower())
            {
                case "name":
                    query = descending ? query.OrderByDescending(p => p.Name) : query.OrderBy(p => p.Name);
                    break;
                case "description":
                    query = descending ? query.OrderByDescending(p => p.Description) : query.OrderBy(p => p.Description);
                    break;
                case "price":
                    query = descending ? query.OrderByDescending(p => p.Price) : query.OrderBy(p => p.Price);
                    break;
                case "productcategoryname":
                    query = descending ? query.OrderByDescending(p => p.ProductCategoryName) : query.OrderBy(p => p.ProductCategoryName);
                    break;
                default:
                    query = descending ? query.OrderByDescending(p => p.Id) : query.OrderBy(p => p.Id);
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
        [HttpGet("by-category")]
        public async Task<ActionResult<IEnumerable<object>>> GetProductsByCategoryNames([FromQuery] string categoryNames)
        {
            if (string.IsNullOrEmpty(categoryNames))
            {
                return BadRequest("Category names cannot be null or empty.");
            }

            var categoryNameList = categoryNames.Split(',').Select(name => name.Trim()).ToList();

            var products = await _context.Products
                .Include(p => p.ProductCategory)
                .Include(p => p.ProductImages)
                .Include(p => p.ProductComments)
                .Where(p => categoryNameList.Contains(p.ProductCategory.Name))
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    ProductCategoryName = p.ProductCategory.Name,
                    Comments = p.ProductComments.Select(c => new
                    {
                        c.Id,
                        c.Content,
                        c.CreatedAt,
                        User = new { c.UserId, UserName = _context.Users.FirstOrDefault(u => u.Id == c.UserId).UserName }
                    }).ToList(),
                    Images = p.ProductImages.Select(i => new
                    {
                        i.Id,
                        i.ImageUrl
                    }).ToList()
                })
                .ToListAsync();

            return Ok(products);
        }

        // GET: api/Products/5
        /*[HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }*/

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }

            var product = await _context.Products
                .Include(p => p.ProductCategory)
                .Include(p => p.ProductImages)
                .Include(p => p.ProductComments)
                /*  .ThenInclude(pc => pc.User)*/
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }



            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, [FromBody] ProductDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            var existingProduct = await _context.Products
                .Include(p => p.ProductImages)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (existingProduct == null)
            {
                return NotFound();
            }

            // Update product properties
            existingProduct.Name = dto.Name;
            existingProduct.Description = dto.Description;
            existingProduct.Price = dto.Price;
            existingProduct.Quantity = dto.Quantity;
            existingProduct.Information = dto.Information;
            existingProduct.Status = dto.Status;

            // Update product category if provided
            if (dto.ProductCategoryId != 0)
            {
                var category = await _context.ProductCategories.FirstOrDefaultAsync(pc => pc.Id == dto.ProductCategoryId);
                if (category != null)
                {
                    existingProduct.ProductCategoryId = category.Id;
                }
            }

            // Update product images
            var currentImages = existingProduct.ProductImages.ToList();
            var updatedImageUrls = dto.Images.Select(i => i.ImageUrl).ToList();

            // Remove images that are no longer in the DTO
            foreach (var image in currentImages)
            {
                if (!updatedImageUrls.Contains(image.ImageUrl))
                {
                    _context.ProductImages.Remove(image);
                }
            }

            // Add new images that are not in the current images
            foreach (var imageUrl in updatedImageUrls)
            {
                if (!currentImages.Any(i => i.ImageUrl == imageUrl))
                {
                    existingProduct.ProductImages.Add(new ProductImage { ImageUrl = imageUrl });
                }
            }

            // Save changes to the database
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromBody] CreateProductDto createProductDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var product = createProductDto.Product;
                product.ProductImages = createProductDto.Images;

                // Add the product to the database
                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                // Return created response with product information
                return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<object>>> SearchProducts([FromQuery] string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                return BadRequest("Search query cannot be null or empty.");
            }

            var products = await _context.Products
                .Include(p => p.ProductImages)
                .ToListAsync();

            return Ok(products);
        }



        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateProductStatus(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            product.Status = !product.Status;
            await _context.SaveChangesAsync();

            return Ok(product);
        }



        private bool ProductExists(int id)
        {
            return (_context.Products?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}