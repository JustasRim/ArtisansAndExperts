using Domain.Common;
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

        public IList<Image>? Images { get; set; }

        public IList<Offer>? Offers { get; set; }
    }
}
