using Domain.Common;

namespace Domain.Model
{
    public class Client : BaseEntity
    {
        IList<Project>? Projects { get; set; }
    }
}
