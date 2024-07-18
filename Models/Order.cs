using System.Text.Json.Serialization;

namespace EcomerceApp.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; } // Khóa ngoại đến bảng User
        public DateTime OrderDate { get; set; }
        public int? CouponId { get; set; } = null;// Khóa ngoại đến bảng Coupon, cho phép null

        public string? note { get; set; }
        public string Status { get; set; }

        // Các thuộc tính khác tùy thuộc vào yêu cầu cụ thể

        // Định nghĩa quan hệ 1-n với bảng OrderDetail
        public ICollection<OrderDetail> OrderDetails { get; set; }

        // Định nghĩa quan hệ n-1 với bảng User
             [JsonIgnore]
        public ApplicationUser User { get; set; }

        // Định nghĩa quan hệ n-1 với bảng Coupon
                [JsonIgnore]
        public Coupon? Coupon { get; set; }
    }
}
