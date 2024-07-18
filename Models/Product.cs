using System.Text.Json.Serialization;

namespace EcomerceApp.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        public string? Information { get; set; }

        public bool Status { get; set; } = true; // Trạng thái của sản phẩm (hoạt động hay không hoạt động)

        public int ProductCategoryId { get; set; } // Khóa ngoại đến bảng ProductCategory
        // Quan hệ n-1 với ProductCategory
        [JsonIgnore]
        public ProductCategory? ProductCategory { get; set; }
        // Quan hệ 1-n với ProductComment
        public ICollection<ProductComment>? ProductComments { get; set; }

        // Quan hệ 1-n với ProductImage
        public ICollection<ProductImage>? ProductImages { get; set; }
    }
}
