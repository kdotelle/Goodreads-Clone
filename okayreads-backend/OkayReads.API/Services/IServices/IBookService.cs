using System.Collections;
using OkayReads.Models;

namespace OkayReads.API.Services.IServices;

public interface IBookService
{
    Task<IEnumerable<Book>> GetAllBooksAsync();
}