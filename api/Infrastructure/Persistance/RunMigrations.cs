using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Persistance
{
    public static class RunMigrations
    {
        public static void RunMigration(this IServiceScope scope)
        {
            var dbContext = scope.ServiceProvider
                .GetRequiredService<AaEDbContext>();
            dbContext.Database.Migrate();
        } 
    }
}
