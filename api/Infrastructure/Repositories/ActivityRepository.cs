using Application.Common.Interfaces;
using Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal class ActivityRepository : IRepository<Activity>
    {
        private readonly AaEDbContext _context;

        public ActivityRepository(AaEDbContext context)
        {
            _context = context;
        }

        public async Task<int> Add(Activity entity)
        {
            await _context.AddAsync(entity);
            return await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            _context.Activities.Remove(new Activity { Id = id });
            await _context.SaveChangesAsync();
        }

        public Activity? Get(Func<Activity, bool> pred) => _context.Activities.FirstOrDefault(pred);

        public Activity? GetById(int id) => _context.Activities.Find(id);

        public IList<Activity> GetAll() => _context.Activities.Include(q => q.Experts).ToList();

        public async Task Update(Activity entity)
        {
            var activity = _context.Activities.Find(entity.Id);
            if (activity == null)
            {
                return;
            }

            _context.Entry(entity).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();
        }
    }
}
