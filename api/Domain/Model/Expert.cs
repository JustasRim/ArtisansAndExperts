using Domain.Common;
using System.ComponentModel.DataAnnotations;

namespace Domain.Model
{
    public class Expert : BaseEntity
    {
        public string? ProfileSrc { get; set; }

        public string? WorkDescription { get; set; }

        [Phone]
        public string? MobilePhone { get; set; }

        [StringLength(100)]
        public string? City { get; set; }

        public int Radius { get; set; }

        public User? User { get; set; }

        public int UserId { get; set; }

        public IList<Activity>? Activities { get; set; }

        public IList<Offer>? Offers { get; set; }
    }
}
