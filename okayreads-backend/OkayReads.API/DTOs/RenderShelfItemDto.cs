using OkayReads.Models;

namespace OkayReads.API.DTOs;

public record RenderShelfItemDto(
    int ShelfItemId,
    int? ProgressPercent,
    int? CurrentPage,
    BookDto BookDto,
    ShelfType ShelfType,
    DateTime? StartedAt,
    DateTime? FinishedAt
);