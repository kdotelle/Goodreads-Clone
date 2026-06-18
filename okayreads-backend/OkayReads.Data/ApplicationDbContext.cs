using Microsoft.EntityFrameworkCore;
using OkayReads.Models;

namespace OkayReads.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}
    
    public DbSet<User> Users { get; set; }
    
    
}