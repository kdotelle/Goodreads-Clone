using OkayReads.Models;
using System.Collections.Generic;
using System.Text;

namespace OkayReads.API.Services.IServices;

public interface IUserShelfService
{
    Task<IEnumerable<UserShelf>> GetUserShelvesAsync(string NameIdentifier);
}