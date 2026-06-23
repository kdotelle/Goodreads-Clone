using Microsoft.EntityFrameworkCore;
using OkayReads.Models;

namespace OkayReads.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}
    
    public DbSet<User> Users { get; set; }
    public DbSet<Book> Books { get; set; }
    public DbSet<Shelf> Shelves {get; set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Shelf>().HasData(
            new Shelf { Id = 1, Name = "Currently Reading" },
            new Shelf { Id = 2, Name = "Want to Read" },
            new Shelf { Id = 3, Name = "Read" },
            new Shelf { Id = 4, Name = "Did Not Finish" }
        );

        modelBuilder.Entity<Book>().HasData(
            new Book {Id = 1, Title = "Handle With Care", Author = "Jodi Picoult", Description = "A girl is born with a disease that will cause her immense pain and suffering, and her parents must confront the question of what constitutes a valuable life.", PublishedDate = "2009-03-03", PageCount = 498},
            new Book {Id = 2, Title = "Horton Hears a Who!", Author = "Dr. Seuss", Description = "Choose kindness with Horton the elephant and the Whos of Who-ville in Dr. Seuss’s classic picture book about caring for others!", PublishedDate = "2013-09-24", PageCount = 37 }
        );
    }
}