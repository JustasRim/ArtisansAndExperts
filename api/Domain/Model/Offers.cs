using Domain.Common;

namespace Domain.Model
{
    public class Offers : BaseEntity
    {
        public DateTime Date { get; set; } = DateTime.Now;

        public string? Description { get; set; }

        public decimal? Price { get; set; }
    }
}
