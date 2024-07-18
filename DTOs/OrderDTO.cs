namespace EcomerceApp.DTOs
{
    public class OrderDTO
    {
        public string UserId { get; set; }
        public int? CouponId { get; set; }
        public string Note { get; set; }
        public string Status { get; set; }
        public List<OrderDetailDTO> OrderDetails { get; set; }
    }

    public class OrderDetailDTO
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
