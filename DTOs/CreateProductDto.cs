using EcomerceApp.Models;

namespace EcomerceApp.DTOs
{
    public class CreateProductDto
    {
        public Product Product { get; set; }
        public List<ProductImage> Images { get; set; }
    }
}
