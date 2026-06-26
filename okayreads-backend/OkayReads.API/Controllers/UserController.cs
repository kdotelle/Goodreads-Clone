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
}