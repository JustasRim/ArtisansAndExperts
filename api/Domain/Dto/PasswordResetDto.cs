using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    public class PasswordResetDto
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [StringLength(100)]
        public string? NewPassword { get; set; }

        public Guid Token { get; set; }
    }
}
