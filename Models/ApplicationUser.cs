using Microsoft.AspNetCore.Identity;

namespace EcomerceApp.Models;

public class ApplicationUser : IdentityUser
{
    public string imgUrl { get; set; }

    public string? Address1 { get; set; }

    public string? Address2 { get; set; }
    public bool isDeleted { get; set; } = false;
    // Định nghĩa quan hệ 1-n với bảng Order
    public ICollection<Order>? Orders { get; set; }

    // Định nghĩa quan hệ 1-n với bảng Address

    // Quan hệ 1-n với ProductComment
    public ICollection<ProductComment>? ProductComments { get; set; }

    // Quan hệ 1-n với BlogPostComment
    public ICollection<BlogPostComment>? BlogPostComments { get; set; }

    public ICollection<BlogPost>? BlogPosts { get; set; }
}
