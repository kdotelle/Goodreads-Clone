using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using OkayReads.API.Services;
using OkayReads.Data;
using OkayReads.Models;

namespace OkayReads.Tests;

public class BookServiceTests : IDisposable
{
    private readonly ApplicationDbContext _context;
    private readonly SqliteConnection _connection;

    public BookServiceTests()
    {
        _connection = new SqliteConnection("DataSource=:memory:");
        _connection.Open();

        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseSqlite(_connection)
            .Options;

        _context = new ApplicationDbContext(options);

        _context.Database.EnsureCreated();
    }
    
    [Fact]
    public async Task AddDuplicateBooks_ShouldThrowError()
    {
        var book1 = new Book
        {
            GoogleBooksId = "abcd1234",
            Title = "Test Book 1",
            Authors = "Jane Doe"
        };

        var book2 = new Book
        {
            GoogleBooksId = "abcd1234",
            Title = "Test Book 2",
            Authors = "John Doe"
        };

        var exception = await Assert.ThrowsAsync<DbUpdateException>(async () =>
        {
            _context.Books.Add(book1);
            await _context.SaveChangesAsync();

            _context.Books.Add(book2);
            await _context.SaveChangesAsync();

        });

            Console.WriteLine($"**EXCEPTION** {(exception.InnerException == null ? "NULL" : exception.InnerException.GetType().FullName)}");    
    }

    public void Dispose()
    {
        _context?.Dispose();
        _connection?.Dispose();
    }
}