using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OkayReads.API.Services;
using OkayReads.Data;

namespace OkayReads.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserShelfController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UserShelfController(ApplicationDbContext context)
    {
        _context = context;
    }
    
    // GET
    [HttpGet("public")]
    public IActionResult GetPublic()
    {
        return Ok("Anyone can see this");
    }

    [Authorize]
    [HttpGet]
    public IActionResult GetUserShelves()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return Ok($"shelves for user {userId}");
    }
}