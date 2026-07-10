namespace OkayReads.API.DTOs;

public record GoogleBookDto(
    string GoogleBooksId, 
    string? Title,
    string? Subtitle,
    string? Description,
    string? Authors,
    string? Publisher,
    string? PublishedDate,
    string? Isbn10,
    string? Isbn13,
    int? PageCount,
    string? ThumbnailUrl,
    string? Categories,
    string? Language
);