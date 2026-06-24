using System.ComponentModel.DataAnnotations;

namespace OkayReads.Models;

public class Book
{
    [Key]
    public int Id { get; set; }
    //google book identifier
    public string GoogleBooksId {get; set;} = string.Empty;
    
    public string Title { get; set; } = string.Empty;
    public string? Subtitle {get; set;}
    public string? Description { get; set; }
   
    public string Authors { get; set; } = string.Empty;
    
    public string? ThumbnailUrl { get; set; }
    
    public string? Publisher { get; set; }
    public string? PublishedDate {get; set;}
    public int? PageCount {get; set;}
    public string? Language {get; set;}

    public string? Isbn10 { get; set; }
    public string? Isbn13 { get; set; }

    public string? Categories { get; set; }
    public double? AverageRating { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime ModifiedAt { get; set; } = DateTime.UtcNow;

    public ICollection<ShelfItem> ShelfItems { get; set; } = new List<ShelfItem>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}