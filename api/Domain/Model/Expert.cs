using Domain.Common;

namespace Domain.Model
{
    public class Expert : BaseEntity
    {
        public string? ProfileSrc { get; set; }

        public string? WorkDescription { get; set; }

        public string? MobilePhone { get; set; }

        public string? City { get; set; }

        public int Radius { get; set; }

        public IList<Activity>? Activities { get; set; }

        public IList<Offer>? Offers { get; set; }
    }
}
