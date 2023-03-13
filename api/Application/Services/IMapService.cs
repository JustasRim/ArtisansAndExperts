namespace Application.Services
{
    public interface IMapService
    {
        Task<double> GetDistanceBetweenObjects(string a, string b);
    }
}
