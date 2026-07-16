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
            entity.HasIndex(s => new { s.UserId, s.BookId }).IsUnique();

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
        
        // Users
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    ExternalId = "github|12345",
                    Email = "kristenl@example.com",
                    Username = "kristenExample",
                    Bio = "Lover of fantasy, sci-fi, and anything that keeps me up past midnight.",
                    Location = "Virginia, USA",
                    AvatarUrl = "https://avatars.githubusercontent.com/u/12345",
                    Provider = "github",
                    CreatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                },
                new User
                {
                    Id = 2,
                    ExternalId = "google|67890",
                    Email = "janedoe@example.com",
                    Username = "janedoe",
                    Bio = "Historical fiction and mystery lover.",
                    Location = "New York, USA",
                    AvatarUrl = null,
                    Provider = "google",
                    CreatedAt = new DateTime(2024, 2, 1, 0, 0, 0, DateTimeKind.Utc),
                },
                new User
                {
                    Id = 3,
                    ExternalId = "github|11111",
                    Email = "bookworm@example.com",
                    Username = "bookworm99",
                    Bio = "I read everything I can get my hands on.",
                    Location = "Austin, TX",
                    AvatarUrl = null,
                    Provider = "github",
                    CreatedAt = new DateTime(2024, 3, 1, 0, 0, 0, DateTimeKind.Utc),
                    
                }
            );
        
            // Books
            modelBuilder.Entity<Book>().HasData(
                new Book
                {
                    Id = 1,
                    GoogleBooksId = "zyTCAlFPjgYC",
                    Title = "The Name of the Wind",
                    Subtitle = "The Kingkiller Chronicle: Day One",
                    Authors = "Patrick Rothfuss",
                    Description = "A legendary figure recounts his life story, from his childhood in a troupe of traveling players to years spent as a near-mythical assassin.",
                    Publisher = "DAW Books",
                    PublishedDate = "2007-03-27",
                    PageCount = 662,
                    Language = "en",
                    ThumbnailUrl = "https://books.google.com/books/content?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1",
                    Isbn13 = "9780756404079",
                    Isbn10 = "0756404079",
                    Categories = "Fantasy",
                    AverageRating = 4.5,
                    CreatedAt = new DateTime(2024, 1, 15, 0, 0, 0, DateTimeKind.Utc),
                    ModifiedAt = new DateTime(2024, 1, 15, 0, 0, 0, DateTimeKind.Utc),
                },
                new Book
                {
                    Id = 2,
                    GoogleBooksId = "aWZzLPhY4o0C",
                    Title = "Project Hail Mary",
                    Subtitle = null,
                    Authors = "Andy Weir",
                    Description = "A lone astronaut must save the earth from disaster in this propulsive new science-based thriller from the #1 New York Times bestselling author of The Martian.",
                    Publisher = "Ballantine Books",
                    PublishedDate = "2021-05-04",
                    PageCount = 476,
                    Language = "en",
                    ThumbnailUrl = "https://books.google.com/books/content?id=aWZzLPhY4o0C&printsec=frontcover&img=1&zoom=1",
                    Isbn13 = "9780593135204",
                    Isbn10 = "0593135202",
                    Categories = "Science Fiction",
                    AverageRating = 4.8,
                    CreatedAt = new DateTime(2024, 1, 15, 0, 0, 0, DateTimeKind.Utc),
                    ModifiedAt = new DateTime(2024, 1, 15, 0, 0, 0, DateTimeKind.Utc),
                },
                new Book
                {
                    Id = 3,
                    GoogleBooksId = "boBIEAAAQBAJ",
                    Title = "The House in the Cerulean Sea",
                    Subtitle = null,
                    Authors = "TJ Klune",
                    Description = "A magical island. A dangerous task. A burning secret. Lambda-1006 is a caseworker at the Department in Charge of Magical Youth.",
                    Publisher = "Tor Books",
                    PublishedDate = "2020-03-17",
                    PageCount = 394,
                    Language = "en",
                    ThumbnailUrl = "https://books.google.com/books/content?id=boBIEAAAQBAJ&printsec=frontcover&img=1&zoom=1",
                    Isbn13 = "9781250217318",
                    Isbn10 = "1250217318",
                    Categories = "Fantasy",
                    AverageRating = 4.7,
                    CreatedAt = new DateTime(2024, 1, 20, 0, 0, 0, DateTimeKind.Utc),
                    ModifiedAt = new DateTime(2024, 1, 20, 0, 0, 0, DateTimeKind.Utc),
                },
                new Book
                {
                    Id = 4,
                    GoogleBooksId = "xuV1EAAAQBAJ",
                    Title = "Fourth Wing",
                    Subtitle = null,
                    Authors = "Rebecca Yarros",
                    Description = "Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, but instead she is ordered to join the hundreds of candidates striving to become dragon riders.",
                    Publisher = "Entangled: Red Tower Books",
                    PublishedDate = "2023-05-02",
                    PageCount = 517,
                    Language = "en",
                    ThumbnailUrl = "https://books.google.com/books/content?id=xuV1EAAAQBAJ&printsec=frontcover&img=1&zoom=1",
                    Isbn13 = "9781649374172",
                    Isbn10 = "1649374178",
                    Categories = "Fantasy",
                    AverageRating = 4.6,
                    CreatedAt = new DateTime(2024, 2, 1, 0, 0, 0, DateTimeKind.Utc),
                    ModifiedAt = new DateTime(2024, 2, 1, 0, 0, 0, DateTimeKind.Utc),
                },
                new Book
                {
                    Id = 5,
                    GoogleBooksId = "odVhDwAAQBAJ",
                    Title = "Piranesi",
                    Subtitle = null,
                    Authors = "Susanna Clarke",
                    Description = "Piranesi's house is no ordinary building: its rooms are infinite, its corridors endless, its walls are lined with thousands upon thousands of statues.",
                    Publisher = "Bloomsbury Publishing",
                    PublishedDate = "2020-09-15",
                    PageCount = 272,
                    Language = "en",
                    ThumbnailUrl = "https://books.google.com/books/content?id=odVhDwAAQBAJ&printsec=frontcover&img=1&zoom=1",
                    Isbn13 = "9781526622433",
                    Isbn10 = "1526622432",
                    Categories = "Fantasy",
                    AverageRating = 4.4,
                    CreatedAt = new DateTime(2024, 2, 10, 0, 0, 0, DateTimeKind.Utc),
                    ModifiedAt = new DateTime(2024, 2, 10, 0, 0, 0, DateTimeKind.Utc),
                },
                new Book
                {
                    Id = 6,
                    GoogleBooksId = "dBjWDQAAQBAJ",
                    Title = "Normal People",
                    Subtitle = null,
                    Authors = "Sally Rooney",
                    Description = "Connell and Marianne grow up in the same small town in the west of Ireland, but the similarities end there.",
                    Publisher = "Faber & Faber",
                    PublishedDate = "2018-08-30",
                    PageCount = 273,
                    Language = "en",
                    ThumbnailUrl = "https://books.google.com/books/content?id=dBjWDQAAQBAJ&printsec=frontcover&img=1&zoom=1",
                    Isbn13 = "9780571334650",
                    Isbn10 = "0571334652",
                    Categories = "Literary Fiction",
                    AverageRating = 3.9,
                    CreatedAt = new DateTime(2024, 2, 15, 0, 0, 0, DateTimeKind.Utc),
                    ModifiedAt = new DateTime(2024, 2, 15, 0, 0, 0, DateTimeKind.Utc),
                }
            );
        
            // Shelves (one per shelf type per user)
            modelBuilder.Entity<UserShelf>().HasData(
                // User 1 shelves
                new UserShelf { Id = 1, UserId = 1, Shelf = ShelfType.CurrentlyReading, CreatedAt = new DateTime(2024, 1, 15, 0, 0, 0, DateTimeKind.Utc) },
                new UserShelf { Id = 2, UserId = 1, Shelf = ShelfType.WantToRead, CreatedAt = new DateTime(2024, 1, 15, 0, 0, 0, DateTimeKind.Utc) },
                new UserShelf { Id = 3, UserId = 1, Shelf = ShelfType.Read, CreatedAt = new DateTime(2024, 1, 15, 0, 0, 0, DateTimeKind.Utc) },
                new UserShelf { Id = 4, UserId = 1, Shelf = ShelfType.DidNotFinish, CreatedAt = new DateTime(2024, 1, 15, 0, 0, 0, DateTimeKind.Utc) },
                // User 2 shelves
                new UserShelf { Id = 5, UserId = 2, Shelf = ShelfType.CurrentlyReading, CreatedAt = new DateTime(2024, 2, 1, 0, 0, 0, DateTimeKind.Utc) },
                new UserShelf { Id = 6, UserId = 2, Shelf = ShelfType.WantToRead, CreatedAt = new DateTime(2024, 2, 1, 0, 0, 0, DateTimeKind.Utc) },
                new UserShelf { Id = 7, UserId = 2, Shelf = ShelfType.Read, CreatedAt = new DateTime(2024, 2, 1, 0, 0, 0, DateTimeKind.Utc) },
                new UserShelf { Id = 8, UserId = 2, Shelf = ShelfType.DidNotFinish, CreatedAt = new DateTime(2024, 2, 1, 0, 0, 0, DateTimeKind.Utc) }
            );
        
            // ShelfItems
            modelBuilder.Entity<ShelfItem>().HasData(
                // User 1 - currently reading
                new ShelfItem
                {
                    Id = 1,
                    UserShelfId = 1,
                    BookId = 1,
                    UserId = 1,
                    ProgressPercent = 62,
                    CurrentPage = 410,
                    AddedAt = new DateTime(2024, 5, 1, 0, 0, 0, DateTimeKind.Utc),
                    StartedAt = new DateTime(2024, 5, 1, 0, 0, 0, DateTimeKind.Utc),
                    FinishedAt = null,
                },
                new ShelfItem
                {
                    Id = 2,
                    UserShelfId = 1,
                    BookId = 5,
                    UserId = 1,
                    ProgressPercent = 88,
                    CurrentPage = 239,
                    AddedAt = new DateTime(2024, 5, 15, 0, 0, 0, DateTimeKind.Utc),
                    StartedAt = new DateTime(2024, 5, 15, 0, 0, 0, DateTimeKind.Utc),
                    FinishedAt = null,
                },
                // User 1 - want to read
                new ShelfItem
                {
                    Id = 3,
                    UserShelfId = 2,
                    BookId = 4,
                    UserId = 1,
                    ProgressPercent = null,
                    CurrentPage = null,
                    AddedAt = new DateTime(2024, 5, 20, 0, 0, 0, DateTimeKind.Utc),
                    StartedAt = null,
                    FinishedAt = null,
                },
                // User 1 - read
                new ShelfItem
                {
                    Id = 4,
                    UserShelfId = 3,
                    BookId = 2,
                    UserId = 1,
                    ProgressPercent = 100,
                    CurrentPage = 476,
                    AddedAt = new DateTime(2024, 3, 1, 0, 0, 0, DateTimeKind.Utc),
                    StartedAt = new DateTime(2024, 3, 1, 0, 0, 0, DateTimeKind.Utc),
                    FinishedAt = new DateTime(2024, 3, 20, 0, 0, 0, DateTimeKind.Utc),
                },
                new ShelfItem
                {
                    Id = 5,
                    UserShelfId = 3,
                    BookId = 3,
                    UserId = 1,
                    ProgressPercent = 100,
                    CurrentPage = 394,
                    AddedAt = new DateTime(2024, 4, 1, 0, 0, 0, DateTimeKind.Utc),
                    StartedAt = new DateTime(2024, 4, 1, 0, 0, 0, DateTimeKind.Utc),
                    FinishedAt = new DateTime(2024, 4, 20, 0, 0, 0, DateTimeKind.Utc),
                },
                new ShelfItem
                {
                    Id = 6,
                    UserShelfId = 3,
                    BookId = 6,
                    UserId = 1,
                    ProgressPercent = 100,
                    CurrentPage = 273,
                    AddedAt = new DateTime(2024, 4, 25, 0, 0, 0, DateTimeKind.Utc),
                    StartedAt = new DateTime(2024, 4, 25, 0, 0, 0, DateTimeKind.Utc),
                    FinishedAt = new DateTime(2024, 5, 10, 0, 0, 0, DateTimeKind.Utc),
                },
                // User 2 - currently reading
                new ShelfItem
                {
                    Id = 7,
                    UserShelfId = 5,
                    BookId = 4,
                    UserId = 2,
                    ProgressPercent = 45,
                    CurrentPage = 232,
                    AddedAt = new DateTime(2024, 6, 1, 0, 0, 0, DateTimeKind.Utc),
                    StartedAt = new DateTime(2024, 6, 1, 0, 0, 0, DateTimeKind.Utc),
                    FinishedAt = null,
                },
                // User 2 - want to read
                new ShelfItem
                {
                    Id = 8,
                    UserShelfId = 6,
                    BookId = 1,
                    UserId = 2,
                    ProgressPercent = null,
                    CurrentPage = null,
                    AddedAt = new DateTime(2024, 6, 5, 0, 0, 0, DateTimeKind.Utc),
                    StartedAt = null,
                    FinishedAt = null,
                }
            );
        
            // Reviews
            modelBuilder.Entity<Review>().HasData(
                new Review
                {
                    Id = 1,
                    UserId = 1,
                    BookId = 2,
                    Rating = 5,
                    Body =
                        "Absolutely blown away by this book. The science is fascinating and Rocky is one of the best characters I've ever read. Could not put it down.",
                    ContainsSpoilers = false,
                    CreatedAt = new DateTime(2024, 3, 21, 0, 0, 0, DateTimeKind.Utc),
                    ModifiedAt = null,
                },
                new Review
                {
                    Id = 2,
                    UserId = 1,
                    BookId = 3,
                    Rating = 5,
                    Body =
                        "Cozy, warm, and utterly charming. Exactly the kind of book I needed. The world building is subtle but effective and the romance is sweet.",
                    ContainsSpoilers = false,
                    CreatedAt = new DateTime(2024, 4, 21, 0, 0, 0, DateTimeKind.Utc),
                    ModifiedAt = null,
                },
                new Review
                {
                    Id = 3,
                    UserId = 1,
                    BookId = 6,
                    Rating = 3,
                    Body =
                        "Well written but not really my thing. The characters felt distant and I struggled to connect with either of them. Can see why others love it though.",
                    ContainsSpoilers = false,
                    CreatedAt = new DateTime(2024, 5, 11, 0, 0, 0, DateTimeKind.Utc),
                    ModifiedAt = null,
                },
                new Review
                {
                    Id = 4,
                    UserId = 2,
                    BookId = 3,
                    Rating = 4,
                    Body =
                        "Delightful read. The found family trope is done really well here. Docked one star because I felt the pacing dragged in the middle.",
                    ContainsSpoilers = false,
                    CreatedAt = new DateTime(2024, 5, 5, 0, 0, 0, DateTimeKind.Utc),
                    ModifiedAt = null,
                }
            );
    }
    
}