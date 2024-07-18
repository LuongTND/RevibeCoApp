using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcomerceApp.Data;
using EcomerceApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcomerceApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private const string CartSessionKey = "CartItems";

        public ShopController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("{productId}")]
        public async Task<IActionResult> AddToCart(int productId)
        {
            var product = await _context.Products
                .Include(p => p.ProductImages).Include(p=>p.ProductCategory)
                  /*  .ThenInclude(pc => pc.User)*/
                .FirstOrDefaultAsync(p => p.Id == productId);


            if (product == null)
            {
                return NotFound("Product not found.");
            }

            List<CartItem> cartItems = HttpContext.Session.GetObjectFromJson<List<CartItem>>(CartSessionKey) ?? new List<CartItem>();

            var existingCartItem = cartItems.FirstOrDefault(p => p.ProductId == productId);
            if (existingCartItem != null)
            {
                existingCartItem.Quantity++;
            }
            else
            {
                cartItems.Add(new CartItem
                {
                    ProductId = product.Id,
                    CategoryName = product.ProductCategory.Name,
                    Name = product.Name,
                    Price = product.Price,
                    ImageUrl = product.ProductImages,
                    Quantity = 1
                });
            }

            HttpContext.Session.SetObjectAsJson(CartSessionKey, cartItems);

            return Ok(cartItems);
        }

        [HttpGet]
        public IActionResult GetCartItems()
        {
            var cartItems = HttpContext.Session.GetObjectFromJson<List<CartItem>>(CartSessionKey) ?? new List<CartItem>();
            return Ok(cartItems);
        }

        [HttpDelete("{productId}")]
        public IActionResult RemoveFromCart(int productId)
        {
            var cartItems = HttpContext.Session.GetObjectFromJson<List<CartItem>>(CartSessionKey) ?? new List<CartItem>();

            var productToRemove = cartItems.FirstOrDefault(p => p.ProductId == productId);
            if (productToRemove != null)
            {
                cartItems.Remove(productToRemove);

                HttpContext.Session.SetObjectAsJson(CartSessionKey, cartItems);
                return Ok(cartItems);
            }
            else
            {
                return NotFound("Product not found in the cart.");
            }
        }


        [HttpPut("{productId}")]
        public IActionResult UpdateCartItemQuantity(int productId, int quantity)
        {
            if (quantity < 1)
            {
                return BadRequest("Quantity must be at least 1.");
            }

            var cartItems = HttpContext.Session.GetObjectFromJson<List<CartItem>>(CartSessionKey) ?? new List<CartItem>();

            var existingCartItem = cartItems.FirstOrDefault(p => p.ProductId == productId);
            if (existingCartItem != null)
            {
                existingCartItem.Quantity = quantity;
                HttpContext.Session.SetObjectAsJson(CartSessionKey, cartItems);
                return Ok(cartItems);
            }
            else
            {
                return NotFound("Product not found in the cart.");
            }
        }
        [HttpGet("search")]
        public IActionResult SearchProducts(string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm))
            {
                // If the search term is null or empty, return BadRequest
                return BadRequest("Search term is required.");
            }

            // Filter the list of products based on the search term
            var products = _context.Products.Where(p => p.Name.Contains(searchTerm)).ToList();

            // Check if any products are found
            if (products == null || products.Count == 0)
            {
                // If no products are found, return NotFound
                return NotFound("No products found matching the search term.");
            }

            return Ok(products);
        }

        [HttpGet("filter")]
        public IActionResult FilterProducts(decimal minPrice, decimal maxPrice)
        {
            // Lọc danh sách sản phẩm dựa trên giá tối thiểu và tối đa
            var products = _context.Products
                .Where(p => p.Price >= minPrice && p.Price <= maxPrice)
                .ToList();

            return Ok(products);
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout(string username, int? couponId, string? note)
        {
            // Tìm kiếm người dùng theo tên
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            var userId = user.Id;

            var cartItems = HttpContext.Session.GetObjectFromJson<List<CartItem>>(CartSessionKey) ?? new List<CartItem>();

            if (cartItems.Count == 0)
            {
                return BadRequest("Your cart is empty.");
            }

            // Tạo đơn hàng mới từ giỏ hàng
            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.Now,
                Status = "Pending", // Hoặc trạng thái mặc định khác tùy thuộc vào logic của bạn
                CouponId = couponId,
                note = note,
                OrderDetails = cartItems.Select(item => new OrderDetail
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = item.Price
                }).ToList()
            };

            // Lưu đơn hàng vào cơ sở dữ liệu
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Xóa giỏ hàng sau khi đã tạo đơn hàng thành công
            HttpContext.Session.Remove(CartSessionKey);

            return Ok(order);
        }




    }


    // Session extensions for storing and retrieving complex objects
    public static class SessionExtensions
    {
        public static void SetObjectAsJson(this ISession session, string key, object value)
        {
            session.SetString(key, System.Text.Json.JsonSerializer.Serialize(value));
        }

        public static T GetObjectFromJson<T>(this ISession session, string key)
        {
            var value = session.GetString(key);
            return value == null ? default(T) : System.Text.Json.JsonSerializer.Deserialize<T>(value);
        }
    }
}
