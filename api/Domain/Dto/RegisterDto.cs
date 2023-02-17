using Domain.Enum;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    public class RegisterDto
    {
        [Required]
        [StringLength(100)]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [StringLength(100)]
        [MinLength(2)]
        public string? Name { get; set; }

        [Required]
        [StringLength(100)]
        [MinLength(2)]
        public string? LastName { get; set; }

        [Required]
        [StringLength(100)]
        [MinLength(6)]
        public string? Password { get; set; }

        public bool Expert { get; set; }
    }
}
