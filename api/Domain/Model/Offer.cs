using Domain.Common;
using System.ComponentModel.DataAnnotations;

namespace Domain.Model
{
    public class Offer : BaseEntity
    {
        public DateTime Date { get; set; } = DateTime.Now;

        [Required]
        public string? Description { get; set; }

        [Required]
        public decimal? Price { get; set; }

        public IList<OfferStep>? Steps { get; set; }

        public Project? Project { get; set; }

        public int ProjectId { get; set; }

        public Expert? Expert { get; set; }

        public int ExpertId { get; set; }
    }
}
