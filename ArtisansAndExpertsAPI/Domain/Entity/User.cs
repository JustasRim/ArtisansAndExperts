using Domain.Common;
using Domain.Enum;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entity
{
    public class User : BaseEntity
    {
        [Required]
        [StringLength(100)]
        [EmailAddress]
        public string? Email { get; set; }

        public string? Password { get; set; }

        public Role Role { get; set; }

        public bool EmailConfirmed { get; set; } = false;

        public int FkExpert { get; set; }
    }
}
