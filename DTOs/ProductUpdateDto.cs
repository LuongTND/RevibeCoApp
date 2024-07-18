using System;
using System.Collections.Generic;

namespace EcommerceApp.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string Information { get; set; }
        public bool Status { get; set; }
        public int ProductCategoryId { get; set; }
        public List<ProductImageDto> Images { get; set; }
    }

    public class ProductCommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserId { get; set; }
    }

    public class ProductImageDto
    {
        public string ImageUrl { get; set; }
    }
}
