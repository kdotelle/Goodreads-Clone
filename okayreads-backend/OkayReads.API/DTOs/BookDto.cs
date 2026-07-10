namespace OkayReads.API.DTOs;

public record BookDto(
    int Id, 
    string GoogleBooksId,
    string Title,
    string Authors,
    string? ThumbnailUrl,
    double? AverageRating,
    string? Description,
    string? Subtitle,
    string? Publisher,
    string? PublishedDate,
    int? PageCount
);