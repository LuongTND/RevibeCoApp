using System.Text.Json.Serialization;

namespace EcomerceApp.Models
{
    public class BlogPostImage
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; } // or byte[] ImageData if storing image data directly
        public int BlogPostId { get; set; } // Foreign key to BlogPost table

        // Many-to-one relationship with BlogPost
        [JsonIgnore]
        public BlogPost BlogPost { get; set; }
    }
}
