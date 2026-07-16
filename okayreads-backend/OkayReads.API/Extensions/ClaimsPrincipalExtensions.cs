using System.Security.Claims;

namespace OkayReads.API.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static string? GetUserExternalId(this ClaimsPrincipal principal)
    {
        return principal.FindFirstValue(ClaimTypes.NameIdentifier) ?? null;
    }
}