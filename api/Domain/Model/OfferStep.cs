using Domain.Common;

namespace Domain.Model
{
    public class OfferStep : BaseEntity
    {
        public string? Name { get; set; }

        public string? Details { get; set; }

        public int Amount { get; set; }

        public decimal? TotalPrice { get; set; }

        public Offer? Offer { get; set; }

        public int OfferId { get; set; }
    }
}
