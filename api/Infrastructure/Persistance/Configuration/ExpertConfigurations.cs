using Domain.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistance.Configuration
{
    internal class ExpertConfigurations : IEntityTypeConfiguration<Expert>
    {
        public void Configure(EntityTypeBuilder<Expert> builder)
        {
            builder
                .HasMany(q => q.Activities)
                .WithMany(q => q.Experts);

            builder
                .HasMany(q => q.Offers)
                .WithOne(q => q.Expert)
                .HasForeignKey(q => q.ExpertId);
        }
    }
}
