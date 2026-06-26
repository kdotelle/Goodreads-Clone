using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OkayReads.API.Services.IServices;
using OkayReads.Data;
using OkayReads.Models;

namespace OkayReads.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookController : Controller
{
    private readonly IBookService _bookService;
    
    public BookController(IBookService bookService)
    {
        _bookService = bookService;
    }
    
    // GET
    [HttpGet]
    public async Task<IEnumerable<Book>> GetAllBooks()
    {
        return await _bookService.GetAllBooksAsync();
    }
}