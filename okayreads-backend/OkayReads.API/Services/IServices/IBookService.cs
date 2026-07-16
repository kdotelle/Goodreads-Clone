using OkayReads.API.DTOs;

namespace OkayReads.API.Services.IServices;

public interface IBookService
{
    Task<BookDto?> GetBookByIdAsync(int id);
    Task<BookDto> GetOrCreateAsync(GoogleBookDto book);
}