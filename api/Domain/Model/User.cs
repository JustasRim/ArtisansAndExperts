using Domain.Common;
using Domain.Enum;
using System.ComponentModel.DataAnnotations;

namespace Domain.Model
{
    public class User : BaseEntity
    {
        [Required]
        [StringLength(100)]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [StringLength(100)]
        public string? Name { get; set; }

        [Required]
        [StringLength(100)]
        public string? LastName { get; set; }

        public string? ProfileSrc { get; set; }

        [Required]
        [StringLength(100)]
        public string? Password { get; set; }

        public string? RefreshToken { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }

        public Role Role { get; set; }

        public bool EmailConfirmed { get; set; } = false;

        public bool IsBanned { get; set; } = false;

        public Expert Expert { get; set; } = new Expert();

        public Client Client { get; set; } = new Client();
    }
}
