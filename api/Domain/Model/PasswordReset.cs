using Domain.Common;
using System.ComponentModel.DataAnnotations;

namespace Domain.Model
{
    public class PasswordReset : BaseEntity
    {
        [Required]
        public Guid Token { get; set; }

        [Required]
        public DateTime Expiration { get; set; }

        public DateTime CreationDate { get; set; } = DateTime.UtcNow;

        public bool isReseted { get; set; } = false;

        public int UserId { get; set; }

        public User User { get; set; }
    }
}
