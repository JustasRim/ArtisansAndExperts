using Application.Repositories;
using Domain.Model;
using System.Linq;

namespace Infrastructure.Repositories
{
    internal class ImageRepository : IImageRepository
    {
        private readonly AaEDbContext _context;

        public ImageRepository(AaEDbContext context)
        {
            _context = context;
        }

        public async Task<int> Add(Image entity)
        {
            await _context.Images.AddAsync(entity);
            return await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            _context.Images.Remove(new Image { Id = id });
            await _context.SaveChangesAsync();
        }

        public Image? Get(Func<Image, bool> pred)
        {
            return _context.Images.FirstOrDefault(pred);
        }

        public IList<Image> GetAll()
        {
            return _context.Images.ToList();
        }

        public Image? GetById(int id)
        {
            return _context.Images.Find(id);
        }

        public async Task Update(Image entity)
        {
            var activity = _context.Activities.Find(entity.Id);
            if (activity == null)
            {
                return;
            }

            _context.Entry(entity).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();
        }

        public async Task AddWithoutCommiting(Image img)
        {
            await _context.AddAsync(img);
        }

        public async Task Commit()
        {
            await _context.SaveChangesAsync();
        }
    }
}
