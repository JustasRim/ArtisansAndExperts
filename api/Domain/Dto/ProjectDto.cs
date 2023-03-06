using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    public class ProjectDto
    {
        [Required]
        [StringLength(1000)]
        public string? Name { get; set; }

        [Required]
        public string? Description { get; set; }
    }
}
