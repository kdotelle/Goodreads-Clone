namespace OkayReads.Models;

public class Review
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int BookId { get; set; }

    public int? Rating { get; set; }
    public string? Body { get; set; }
    public bool ContainsSpoilers { get; set;} = false; 

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ModifiedAt { get; set; }
    
    public User User { get; set; } = null!;
    public Book Book { get; set; } = null!;
}
