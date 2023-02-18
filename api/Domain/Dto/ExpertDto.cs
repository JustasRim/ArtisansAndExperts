using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    public class ExpertDto
    {
        public string? WorkDescription { get; set; }

        [Phone]
        public string? MobilePhone { get; set; }

        [StringLength(100)]
        public string? City { get; set; }

        public int Radius { get; set; }

        public string? ProfileSrc { get; set; }

        public IList<ActivityDto>? Activities { get; set; }
    }
}
