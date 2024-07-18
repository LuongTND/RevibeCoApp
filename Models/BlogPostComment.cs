using System.Text.Json.Serialization;

namespace EcomerceApp.Models
{
    public class BlogPostComment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserId { get; set; } // Khóa ngoại đến bảng User
        public int BlogPostId { get; set; } // Khóa ngoại đến bảng BlogPost

        // Quan hệ n-1 với User
        public ApplicationUser User { get; set; }

        // Quan hệ n-1 với BlogPost
        [JsonIgnore]
        public BlogPost BlogPost { get; set; }
    }
}
