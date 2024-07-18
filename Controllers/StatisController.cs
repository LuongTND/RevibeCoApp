using EcomerceApp.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace EcomerceApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public StatisController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetProductSalesByMonth")]
        public IActionResult GetProductSalesByMonth(string date)
        {
            if (!DateTime.TryParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime selectedDate))
            {
                return BadRequest("Invalid date format. Use yyyy-MM-dd.");
            }

            int year = selectedDate.Year;
            int month = selectedDate.Month;

            var startDate = new DateTime(year, month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);

            var ordersInMonth = _context.Orders
                .Include(o => o.OrderDetails)
                .ThenInclude(od => od.Product)
                .Where(o => o.OrderDate >= startDate && o.OrderDate <= endDate)
                .ToList();

            var productSales = new Dictionary<string, int>();

            foreach (var order in ordersInMonth)
            {
                foreach (var orderDetail in order.OrderDetails)
                {
                    if (orderDetail.Product != null)
                    {
                        var productName = orderDetail.Product.Name;
                        if (productSales.ContainsKey(productName))
                        {
                            productSales[productName] += orderDetail.Quantity;
                        }
                        else
                        {
                            productSales[productName] = orderDetail.Quantity;
                        }
                    }
                }
            }

            return Ok(productSales);
        }


        [HttpGet("GetSalesStatistics")]
        public IActionResult GetSalesStatistics()
        {
            // Calculate total quantity of products sold
            int totalQuantitySold = _context.OrderDetails.Sum(od => od.Quantity);

            // Calculate total revenue from all orders
            decimal totalRevenue = _context.OrderDetails.Sum(od => od.Quantity * od.UnitPrice);

            // Count the number of unique users who made orders
            int uniqueUsersCount = _context.Users.Count();

            var statistics = new
            {
                TotalQuantitySold = totalQuantitySold,
                TotalRevenue = totalRevenue,
                UniqueUsersCount = uniqueUsersCount
            };

            return Ok(statistics);
        }


    }
}
