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
    public class BlogPostCommentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BlogPostCommentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/BlogPostComments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetBlogPostComments(
            int? page = 1, 
            int? pageSize = 10, 
            string orderBy = "CreatedAt", 
            bool descending = false)
        {
            if (page == null || pageSize == null || page <= 0 || pageSize <= 0)
            {
                return BadRequest("Invalid page or pageSize value.");
            }

            var query = from comment in _context.BlogPostComments
                        select new
                        {
                            comment.Id,
                            comment.Content,
                            comment.CreatedAt,
                            BlogPost = (from post in _context.BlogPosts
                                        where post.Id == comment.BlogPostId
                                        select new
                                        {
                                            post.Id,
                                            post.Title
                                        }).FirstOrDefault(),
                            User = (from user in _context.Users
                                    where user.Id == comment.UserId
                                    select new
                                    {
                                        user.Id,
                                        user.UserName
                                    }).FirstOrDefault()
                        };

            // Apply sorting
            switch (orderBy.ToLower())
            {
                case "content":
                    query = descending ? query.OrderByDescending(c => c.Content) : query.OrderBy(c => c.Content);
                    break;
                case "createdat":
                    query = descending ? query.OrderByDescending(c => c.CreatedAt) : query.OrderBy(c => c.CreatedAt);
                    break;
                default:
                    return BadRequest("Invalid orderBy value.");
            }

            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize.Value);

            var results = await query
                .Skip((page.Value - 1) * pageSize.Value)
                .Take(pageSize.Value)
                .ToListAsync();

            return Ok(new { TotalCount = totalCount, TotalPages = totalPages, Results = results });
        }

        // GET: api/BlogPostComments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetBlogPostComment(int id)
        {
            if (_context.BlogPostComments == null)
            {
                return NotFound();
            }
            var comment = await _context.BlogPostComments
                .Include(c => c.BlogPost)
                .Include(c => c.User)
                .Where(c => c.Id == id)
                .Select(c => new
                {
                    c.Id,
                    c.Content,
                    c.CreatedAt,
                    BlogPost = new
                    {
                        c.BlogPost.Id,
                        c.BlogPost.Title
                    },
                    User = new
                    {
                        c.User.Id,
                        c.User.UserName
                    }
                }).FirstOrDefaultAsync();

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        // PUT: api/BlogPostComments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlogPostComment(int id, BlogPostComment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogPostCommentExists(id))
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

        // POST: api/BlogPostComments
        [HttpPost]
        public async Task<ActionResult<BlogPostComment>> CreateBlogPostComment(BlogPostComment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.BlogPostComments.Add(comment);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetBlogPostComment), new { id = comment.Id }, comment);
        }

        // DELETE: api/BlogPostComments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogPostComment(int id)
        {
            if (_context.BlogPostComments == null)
            {
                return NotFound();
            }
            var comment = await _context.BlogPostComments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.BlogPostComments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BlogPostCommentExists(int id)
        {
            return (_context.BlogPostComments?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
