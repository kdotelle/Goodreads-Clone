using Microsoft.EntityFrameworkCore;
using OkayReads.API.Services.IServices;
using OkayReads.Data;
using OkayReads.Models;

namespace OkayReads.API.Services;

public class BookService : IBookService
{
     private readonly ApplicationDbContext _context;
        
     public BookService(ApplicationDbContext context)
     {
         _context = context;
     }

     public async Task<IEnumerable<Book>> GetAllBooksAsync()
     {
         return await _context.Books.ToListAsync();
     }
}