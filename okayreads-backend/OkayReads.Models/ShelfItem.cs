using System.Runtime.InteropServices.JavaScript;

namespace OkayReads.Models;

public class ShelfItem
{
    public int Id { get; set;}
    public int UserShelfId { get; set; }
    public int UserId { get; set; }
    public int BookId { get; set; }

    public int? ProgressPercent { get; set; }
    public int? CurrentPage { get; set; }

    public DateTime AddedAt { get; set; } = DateTime.UtcNow;
    public DateTime? StartedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
    
    public UserShelf UserShelf { get; set; } = null!;
    public Book Book { get; set; } = null!;
    public User User { get; set; } = null!;
}