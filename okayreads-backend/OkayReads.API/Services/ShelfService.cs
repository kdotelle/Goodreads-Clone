using Microsoft.EntityFrameworkCore;
using Npgsql;
using OkayReads.API.Services.IServices;
using OkayReads.Data;
using OkayReads.Models;
using OkayReads.API.DTOs;
using System.Security.Claims;
using static OkayReads.API.Extensions.ClaimsPrincipalExtensions;

namespace OkayReads.API.Services;

public class ShelfService : IShelfService
{
    private readonly ApplicationDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IBookService _bookService;
    
    public ShelfService(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor, IBookService bookService) 
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
        _bookService = bookService;
    }
    
    private async Task<int> GetCurrentUserId()
    {
        string? userExternalId = _httpContextAccessor.HttpContext?.User.GetUserExternalId();
        User? user = await _context.Users.FirstOrDefaultAsync(x => x.ExternalId == userExternalId);
        
        if(user is null) throw new InvalidOperationException($"No local user found for externalid {userExternalId}");

        return user.Id;
    }
    
    private async Task<ShelfItem?> FindShelfItemAsync(int bookId)
    {
        var userId = await GetCurrentUserId();
        return await _context.ShelfItems.Include(x => x.UserShelf).SingleOrDefaultAsync(x => x.BookId == bookId && x.UserId == userId);
    }
    
    private async Task<RenderShelfItemDto> MapToRenderDto(ShelfItem shelfItem)
    {
        BookDto? renderBookDto = await _bookService.GetBookByIdAsync(shelfItem.BookId);

        if (shelfItem.UserShelf is null)
            throw new InvalidOperationException($"No local user shelf type found for shelfItem {shelfItem.Id}");

        if (renderBookDto is null)
            throw new InvalidOperationException($"No local book found for book {shelfItem.BookId}");
        
        return new RenderShelfItemDto(
            shelfItem.Id,
            shelfItem.ProgressPercent,
            shelfItem.CurrentPage,
            renderBookDto,
            shelfItem.UserShelf.ShelfType,
            shelfItem.StartedAt,
            shelfItem.FinishedAt
        );
    }
}