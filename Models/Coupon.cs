namespace EcomerceApp.Models
{
    public class Coupon
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public decimal DiscountAmount { get; set; }
        public DateTime ExpiryDate { get; set; }
        // Các thuộc tính khác tùy thuộc vào yêu cầu cụ thể
        public bool Status { get; set; } // Trạng thái của mã giảm giá (hoạt động hay không hoạt động)
        public bool IsDeleted { get; set; }

    }
}
