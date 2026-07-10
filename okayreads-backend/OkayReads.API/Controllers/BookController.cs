using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OkayReads.API.Services.IServices;
using OkayReads.API.DTOs;

namespace OkayReads.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookController : Controller
{
    private readonly IBookService _bookService;
    private readonly ILogger<BookController> _logger;
    
    public BookController(IBookService bookService, ILogger<BookController> logger)
    {
        _bookService = bookService;
        _logger = logger;
    }
    
    // GET
    [HttpGet("{id}")]
    public async Task<ActionResult<BookDto>> GetBookById(int id)
    {
        var result = await _bookService.GetBookByIdAsync(id);
        if (result is null) return NotFound();
            
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<BookDto>> GetOrCreate(GoogleBookDto googleBook)
    {
        
        try
        {
            var result = await _bookService.GetOrCreateAsync(googleBook);
            return Ok(result);
        }
        catch(DbUpdateException ex)
        {
            _logger.LogError(ex, "An error occured while creating google book id {GoogleBookId}", googleBook.GoogleBooksId);
            return StatusCode(500, "Internal Service Error");
        }
    }
}