using Application.Services;
using GoogleApi.Entities.Maps.Common;
using GoogleApi.Entities.Maps.Common.Enums;
using GoogleApi.Entities.Maps.DistanceMatrix.Request;
using GoogleApi.Interfaces.Maps;
using GoogleApi.Entities.Maps.Directions.Request;
using GoogleApi.Entities.Common;
using GoogleApi.Entities.Common.Enums;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Services
{
    internal class MapService : IMapService
    {
        private readonly IDirectionsApi _directionsApi;
        private readonly IConfiguration _configuration;

        public MapService(IDirectionsApi directionsApi, IConfiguration configuration)
        {
            _directionsApi = directionsApi;
            _configuration = configuration;
        }

        public async Task<double> GetDistanceBetweenObjects(string a, string b)
        {
            var apiKey = _configuration.GetValue<string>("GoogleApiKey");
            var response = await _directionsApi.QueryAsync(new DirectionsRequest
            { 
                Origin = new LocationEx(new Address(a)),
                Destination = new LocationEx(new Address(b)),
                TravelMode = TravelMode.Driving,
                Key = apiKey,
                
            });
            
            if (response.Status != Status.Ok)
            {
                return int.MaxValue;
            }

            return response.Routes.FirstOrDefault().Legs.FirstOrDefault().Distance.Value / 1000.0;
        }
    }
}
