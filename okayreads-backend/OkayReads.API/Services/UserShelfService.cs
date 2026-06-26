using OkayReads.API.Services.IServices;
using OkayReads.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using OkayReads.Data;

namespace OkayReads.API.Services;

public class UserShelfService : IUserShelfService
{
    private readonly ApplicationDbContext _context;
    public UserShelfService(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<IEnumerable<UserShelf>> GetUserShelvesAsync(string NameIdentifier)
    {
        var userId = _context.Users.FirstOrDefault(u => u.ExternalId == NameIdentifier);

        return await _context.UserShelves.Where(s => s.UserId == userId.Id).ToListAsync();
    }
}