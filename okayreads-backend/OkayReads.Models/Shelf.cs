using System.ComponentModel.DataAnnotations;

namespace OkayReads.Models;

public class Shelf
{
    public int Id { get; set; }
    
    [Required]
    [Display(Name = "Shelf Name")]
    public string Name { get; set; }
}