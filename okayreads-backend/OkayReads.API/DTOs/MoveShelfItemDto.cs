using OkayReads.Models;

namespace OkayReads.API.DTOs;

public record MoveShelfItemDto(
    int BookId,
    ShelfType ShelfType
);