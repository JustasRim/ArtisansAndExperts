using Domain.Common;
using Domain.Enum;
using System.ComponentModel.DataAnnotations;

namespace Domain.Model
{
    public class Project : BaseEntity
    {
        [Required]
        [StringLength(1000)]
        public string? Name { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        [StringLength(100)]
        public string? TimeLine { get; set; }

        [Required]
        [StringLength(100)]
        public string? City { get; set; }

        public int ActivityId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public Status Status { get; set; } = Status.Active;

        public Activity? Activity { get; set; }

        public Client? Client { get; set; }

        public int ClientId { get; set; }

        public IList<Image>? Images { get; set; }

        public IList<Offer>? Offers { get; set; }
    }
}
