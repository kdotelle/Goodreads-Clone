using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OkayReads.Data;
using OkayReads.Models;

namespace OkayReads.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : Controller
{
    private readonly ApplicationDbContext _context;
    
    public UserController(ApplicationDbContext context)
    {
        _context = context;
    }
    
    // GET
    [HttpGet]
    public async Task<IEnumerable<User>> GetAllUsers()
    {
        return await _context.Users.ToListAsync();
    }
    
    // called by frontend after NextAuth login
    [Authorize]
    [HttpPost("sync")]
    public async Task<IActionResult> SyncUser()
    {
        // get the external id from the JWT
        var externalId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var email = User.FindFirst(ClaimTypes.Email)?.Value;
    
        if (externalId == null) return Unauthorized();
    
        // check if user already exists
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.ExternalId == externalId);
    
        if (user == null)
        {
            // first login — create the user
            user = new User
            {
                ExternalId = externalId,
                Email = email ?? string.Empty,
                Username = email?.Split('@')[0] ?? externalId,
                Provider = User.FindFirst("provider")?.Value ?? "unknown",
                AvatarUrl = User.FindFirst("picture")?.Value
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }
        else
        {
            // returning user — update last login
            user.ModifiedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    
        return Ok(user);
    }
}