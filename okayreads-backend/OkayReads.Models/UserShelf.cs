namespace OkayReads.Models;

public class UserShelf
{
    public int Id { get; set; }
    public int UserId { get; set; }

    public ShelfType Shelf { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null;
    public ICollection<ShelfItem> ShelfItems { get; set; } = new List<ShelfItem>();
}