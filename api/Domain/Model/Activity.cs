using Domain.Common;
using System.ComponentModel.DataAnnotations;

namespace Domain.Model
{
    public class Activity : BaseEntity
    {
        [Required]
        [StringLength(100)]
        public string? Name { get; set; }
    }
}
