using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using EcomerceApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using EcomerceApp.Data;

namespace EcomerceApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public ApplicationUsersController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        // GET: api/ApplicationUsers
        // GET: api/ApplicationUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetApplicationUsers(
            int? page = 1,
            int? pageSize = 10,
            string orderBy = "UserName",
            bool descending = false)
        {
            if (page == null || pageSize == null || page <= 0 || pageSize <= 0)
            {
                return BadRequest("Invalid page or pageSize value.");
            }

            var query = from user in _context.Users
                        join userRole in _context.UserRoles on user.Id equals userRole.UserId into userRoleGroup
                        from ur in userRoleGroup.DefaultIfEmpty()
                        join role in _context.Roles on ur.RoleId equals role.Id into roleGroup
                        from r in roleGroup.DefaultIfEmpty()
                        group r by new
                        {
                            user.Id,
                            user.UserName,
                            user.Email,
                            user.imgUrl,
                            user.EmailConfirmed,
                            user.PhoneNumber,
                            user.Address1,
                            user.Address2,
                            user.isDeleted
                        } into g
                        select new
                        {
                            Id = g.Key.Id,
                            UserName = g.Key.UserName,
                            Email = g.Key.Email,
                            imgUrl = g.Key.imgUrl,
                            EmailConfirmed = g.Key.EmailConfirmed,
                            PhoneNumber = g.Key.PhoneNumber,
                            Address1 = g.Key.Address1,
                            Address2 = g.Key.Address2,
                            IsDeleted = g.Key.isDeleted,
                            Roles = string.Join(", ", g.Select(x => x.Name))
                        };

            // Apply sorting
            switch (orderBy.ToLower())
            {
                case "username":
                    query = descending ? query.OrderByDescending(u => u.UserName) : query.OrderBy(u => u.UserName);
                    break;
                case "email":
                    query = descending ? query.OrderByDescending(u => u.Email) : query.OrderBy(u => u.Email);
                    break;
                case "emailconfirmed":
                    query = descending ? query.OrderByDescending(u => u.EmailConfirmed) : query.OrderBy(u => u.EmailConfirmed);
                    break;
                case "phonenumber":
                    query = descending ? query.OrderByDescending(u => u.PhoneNumber) : query.OrderBy(u => u.PhoneNumber);
                    break;
                case "address1":
                    query = descending ? query.OrderByDescending(u => u.Address1) : query.OrderBy(u => u.Address1);
                    break;
                case "address2":
                    query = descending ? query.OrderByDescending(u => u.Address2) : query.OrderBy(u => u.Address2);
                    break;
                case "isdeleted":
                    query = descending ? query.OrderByDescending(u => u.IsDeleted) : query.OrderBy(u => u.IsDeleted);
                    break;
                default:
                    return BadRequest("Invalid orderBy value.");
            }

            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize.Value);
            var results = await query.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value).ToListAsync();
            return Ok(new { TotalCount = totalCount, TotalPages = totalPages, Results = results });
        }

        [HttpGet("{id}/roles")]
        public async Task<ActionResult<IEnumerable<string>>> GetUserRoles(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var roles = await _context.UserRoles.Where(ur => ur.UserId == id).ToListAsync();
            string[] roleList = roles.Select(r => r.RoleId).ToArray();
            var UserRoles = await _context.Roles.Where(r => roleList.Contains(r.Id)).Select(r => r.Name).ToListAsync();
            return UserRoles;
        }

        // GET: api/ApplicationUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUser>> GetApplicationUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/ApplicationUsers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApplicationUser(string id, ApplicationUser applicationUser)
        {
            if (id != applicationUser.Id)
            {
                return BadRequest();
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // You may need to update other user properties here as per your application logic
            await _userManager.UpdateAsync(applicationUser);

            return NoContent();
        }

        // POST: api/ApplicationUsers
        [HttpPost]
        public async Task<ActionResult<ApplicationUser>> PostApplicationUser(ApplicationUser applicationUser)
        {
            var result = await _userManager.CreateAsync(applicationUser);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return CreatedAtAction("GetApplicationUser", new { id = applicationUser.Id }, applicationUser);
        }

        // DELETE: api/ApplicationUsers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplicationUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.isDeleted = true;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}/restore")]
        public async Task<IActionResult> RestoreApplicationUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.isDeleted = false;
            _context.SaveChanges();
            return NoContent();
        }


        // PUT: api/ApplicationUsers/5/roles
        [HttpPut("{id}/roles")]
        public async Task<IActionResult> UpdateUserRoles(string id, [FromBody] List<string> roles)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // Get the current roles for the user
            var userRoles = await _userManager.GetRolesAsync(user);

            // Remove the user from current roles
            await _userManager.RemoveFromRolesAsync(user, userRoles);

            // Add the user to the new roles
            var result = await _userManager.AddToRolesAsync(user, roles);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return NoContent();
        }

        private async Task<bool> ApplicationUserExists(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            return (user != null);
        }
    }
}
