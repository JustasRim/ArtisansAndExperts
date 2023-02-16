using Domain.Common;

namespace Domain.Model
{
    public class Offer : BaseEntity
    {
        public DateTime Date { get; set; } = DateTime.Now;

        public string? Description { get; set; }

        public decimal? Price { get; set; }

        public IList<OfferStep>? Steps { get; set; }

        public Project? Project { get; set; }

        public int ProjectId { get; set; }

        public Expert? Expert { get; set; }

        public int ExpertId { get; set; }
    }
}
