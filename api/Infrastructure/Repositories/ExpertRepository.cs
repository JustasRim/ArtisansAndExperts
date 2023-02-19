using Application.Common.Interfaces;
using Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal class ExpertRepository : IRepository<Expert>
    {
        private readonly AaEDbContext _context;

        public ExpertRepository(AaEDbContext context)
        {
            _context = context;
        }

        public async Task<int> Add(Expert entity)
        {
            await _context.Experts.AddAsync(entity);
            return await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            _context.Experts.Remove(new Expert { Id = id });
            await _context.SaveChangesAsync();
        }

        public Expert? Get(Func<Expert, bool> pred) => _context.Experts
            .Include(q => q.User)
            .FirstOrDefault(pred);

        public Expert? GetById(int id) => _context.Experts
            .Include(q => q.User)
            .FirstOrDefault(q => q.Id == id);

        public IList<Expert> GetAll() => _context.Experts
            .Include(q => q.User)
            .Include(q => q.Activities)
            .ToList();

        public async Task Update(Expert entity)
        {
            var Expert = _context.Experts.Find(entity.Id);
            if (Expert == null)
            {
                return;
            }

            _context.Entry(entity).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();
        }
    }
}
