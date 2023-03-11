using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    public class ProjectDto
    {
        public string? Id { get; set; }

        [Required]
        public int ActivityId { get; set; }

        [Required]
        [StringLength(100)]
        public string? TimeLine { get; set; }

        [Required]
        [StringLength(100)]
        public string? City { get; set; }

        [Required]
        [StringLength(1000)]
        public string? Name { get; set; }

        [Required]
        public string? Description { get; set; }

        public IList<ImageDto>? Images { get; set; }
    }
}
