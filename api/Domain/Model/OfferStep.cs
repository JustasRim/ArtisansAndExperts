using Domain.Common;
using System.ComponentModel.DataAnnotations;

namespace Domain.Model
{
    public class OfferStep : BaseEntity
    {
        [Required]
        [StringLength(1000)]
        public string? Name { get; set; }

        [Required]
        public string? Details { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int Amount { get; set; }

        [Required]
        public decimal? TotalPrice { get; set; }

        public Offer? Offer { get; set; }

        public int OfferId { get; set; }
    }
}
