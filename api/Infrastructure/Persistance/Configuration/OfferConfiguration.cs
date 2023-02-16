using Domain.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistance.Configuration
{
    internal class OfferConfiguration : IEntityTypeConfiguration<Offer>
    {
        public void Configure(EntityTypeBuilder<Offer> builder)
        {
            builder
                .HasMany(q => q.Steps)
                .WithOne(q => q.Offer)
                .HasForeignKey(q => q.OfferId);
        }
    }
}
