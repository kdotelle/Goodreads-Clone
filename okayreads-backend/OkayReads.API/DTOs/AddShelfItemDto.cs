using OkayReads.Models;

namespace OkayReads.API.DTOs;

public record AddShelfItemDto(
    GoogleBookDto GoogleBookDto,
    ShelfType ShelfType
);