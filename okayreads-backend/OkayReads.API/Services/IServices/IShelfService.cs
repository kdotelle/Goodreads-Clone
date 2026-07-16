using OkayReads.API.DTOs;

namespace OkayReads.API.Services.IServices;

public interface IShelfService
{
    public Task<List<RenderShelfItemDto>> RenderShelfItemsAsync();
    public Task<RenderShelfItemDto> AddToShelfAsync(AddShelfItemDto addShelfItemDto);
    public Task<RenderShelfItemDto> MoveShelfItemAsync(MoveShelfItemDto moveShelfItemDto);
    public Task RemoveShelfItemAsync(int bookId);
}