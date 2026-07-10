using OkayReads.API.Services.IServices;
using OkayReads.Data;

namespace OkayReads.API.Services;

public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;
    
    public UserService(ApplicationDbContext context)
    {
        _context = context;
    }
    
    
}