namespace EcomerceApp.Models
{
    public class ProductCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        // Các thuộc tính khác tùy thuộc vào yêu cầu cụ thể

        // Quan hệ 1-n với Product
        public ICollection<Product>? Products { get; set; }
    }
}
