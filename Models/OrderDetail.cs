using System.Text.Json.Serialization;

namespace EcomerceApp.Models
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public int OrderId { get; set; } // Khóa ngoại đến bảng Order
        public int ProductId { get; set; } // Khóa ngoại đến bảng Product
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        // Các thuộc tính khác tùy thuộc vào yêu cầu cụ thể

        // Định nghĩa quan hệ n-1 với bảng Order
            [JsonIgnore]
        public Order Order { get; set; }
        // Định nghĩa quan hệ n-1 với bảng Product
               [JsonIgnore]
        public Product Product { get; set; }
    }
}
