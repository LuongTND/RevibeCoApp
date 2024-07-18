namespace EcomerceApp.Models
{
    public class CartItem
    {
        public int ProductId { get; set; }

        public string CategoryName { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public ICollection<ProductImage> ImageUrl { get; set; }
        public int Quantity { get; set; } = 1;
    }
}
