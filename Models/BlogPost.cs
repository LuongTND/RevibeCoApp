using System.Text.Json.Serialization;

namespace EcomerceApp.Models
{
    public class BlogPost
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime PostedOn { get; set; }
        public ICollection<BlogPostComment>? BlogPostComments { get; set; }
        public ICollection<BlogPostImage>? BlogPostImages { get; set; }
    }
}
