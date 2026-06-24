using Microsoft.EntityFrameworkCore;
using OkayReads.Models;

namespace OkayReads.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}
    
    public DbSet<User> Users { get; set; }
    public DbSet<Book> Books { get; set; }
    public DbSet<UserShelf> UserShelves {get; set;}
    public DbSet<ShelfItem> ShelfItems {get; set;}
    public DbSet<Review> Reviews {get; set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(u => u.ExternalId).IsUnique();
            entity.HasIndex(u => u.Email).IsUnique();
            entity.HasIndex(u => u.Username).IsUnique();
        });

        modelBuilder.Entity<Book>(entity => { entity.HasIndex(b => b.GoogleBooksId).IsUnique(); });

        modelBuilder.Entity<ShelfItem>(entity =>
        {
            entity.HasIndex(s => new { s.UserId, s.BookId, s.UserShelfId }).IsUnique();

            entity.HasOne(s => s.Book)
                .WithMany(b => b.ShelfItems)
                .HasForeignKey(s => s.BookId);

            entity.HasOne(s => s.UserShelf)
                .WithMany(u => u.ShelfItems)
                .HasForeignKey(s => s.UserShelfId);
        });

        modelBuilder.Entity<UserShelf>()
            .Property(s => s.Shelf)
            .HasConversion<string>();

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasIndex(r => new { r.UserId, r.BookId }).IsUnique();

            entity.Property(r => r.Rating)
                .HasAnnotation("Range", new[] { 1, 5 });

            entity.HasOne(r => r.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.UserId);

            entity.HasOne(r => r.Book)
                .WithMany(b => b.Reviews)
                .HasForeignKey(r => r.BookId);
        });
    }
}