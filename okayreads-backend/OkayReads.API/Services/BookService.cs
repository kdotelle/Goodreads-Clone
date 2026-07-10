using Microsoft.EntityFrameworkCore;
using Npgsql;
using OkayReads.API.Services.IServices;
using OkayReads.Data;
using OkayReads.Models;
using OkayReads.API.DTOs;

namespace OkayReads.API.Services;

public class BookService : IBookService
{
     private readonly ApplicationDbContext _context;
        
     public BookService(ApplicationDbContext context)
     {
         _context = context;
     }
     
     public async Task<BookDto?> GetBookByIdAsync(int id)
     {
         Book? book = await _context.Books.FirstOrDefaultAsync(x => x.Id == id);

         if (book is null) return null;
         
         return MapToDto(book);
     }

     public async Task<BookDto> GetOrCreateAsync(GoogleBookDto book)
     {
         Book? newBook = await GetByGoogleBooksIdAsync(book.GoogleBooksId);

         if (newBook is not null) return MapToDto(newBook);
         
         Book bookToAdd = MapToEntity(book);

         try
         {
             _context.Books.Add(bookToAdd);
            await _context.SaveChangesAsync();

            return MapToDto(bookToAdd);
         }
         catch (DbUpdateException ex)
         {
             if (ex.InnerException is PostgresException pgEx && pgEx.SqlState == "23505")
             {
                 Book? duplBook = await GetByGoogleBooksIdAsync(book.GoogleBooksId);

                 if (duplBook is null) throw;
                 return MapToDto(duplBook);

             }

             throw;
         }
     }

     private async Task<Book?> GetByGoogleBooksIdAsync(string googleBooksId)
     {
         return await _context.Books.FirstOrDefaultAsync(x => x.GoogleBooksId == googleBooksId);
         //returning book b/c private method never crosses the API boundary
     }

     private static BookDto MapToDto(Book book)
     {
         return new BookDto(
            book.Id,
            book.GoogleBooksId,
            book.Title ?? "Title Unknown",
            book.Authors ?? "Authors Unknown",
            //fallback incase a book is added outside of mapToEntity
            book.ThumbnailUrl,
            book.AverageRating,
            book.Description,
            book.Subtitle,
            book.Publisher,
            book.PublishedDate,
            book.PageCount
         );
     }

     private static Book MapToEntity(GoogleBookDto googleBookDto)
     {
         return new Book
         {
             GoogleBooksId = googleBookDto.GoogleBooksId,
             Title = googleBookDto.Title ?? "Title Unknown",
             Authors = googleBookDto.Authors ?? "Authors Unknown",
             ThumbnailUrl = googleBookDto.ThumbnailUrl,
             Description = googleBookDto.Description,
             Subtitle = googleBookDto.Subtitle,
             Publisher = googleBookDto.Publisher,
             PublishedDate = googleBookDto.PublishedDate,
             PageCount = googleBookDto.PageCount,
             Isbn10 = googleBookDto.Isbn10,
             Isbn13 = googleBookDto.Isbn13,
             Categories = googleBookDto.Categories,
             Language = googleBookDto.Language
         };
     }
}