using System.ComponentModel.DataAnnotations;

namespace OkayReads.Models;

public class User
{
    public int Id { get; set; }
    //map to nextauth session user id
    public string ExternalId {get; set;} = string.Empty;
    
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Bio {get; set;}
    public string? Location {get; set;}
    public string? AvatarUrl {get; set;}
    
    //Oauth provider used
    public string Provider {get; set;} = string.Empty;
    
    public DateTime CreatedAt {get; set;} = DateTime.UtcNow;
    public DateTime? ModifiedAt {get; set;}

    public ICollection<UserShelf> UserShelves { get; set; } = new List<UserShelf>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}
