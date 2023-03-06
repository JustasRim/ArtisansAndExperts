﻿using Application.Repositories;
using Domain.Model;

namespace Infrastructure.Repositories
{
    internal class ProjectRepository : IProjectRepository
    {
        private readonly AaEDbContext _context;

        public ProjectRepository(AaEDbContext context)
        {
            _context = context;
        }

        public async Task<int> Add(Project entity)
        {
            await _context.Projects.AddAsync(entity);
            return await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            _context.Projects.Remove(new Project { Id = id });
            await _context.SaveChangesAsync();
        }

        public Project? Get(Func<Project, bool> pred)
        {
            return _context.Projects.FirstOrDefault(pred);
        }

        public IList<Project> GetAll()
        {
            return _context.Projects.ToList();
        }

        public Project? GetById(int id)
        {
            return _context.Projects.Find(id);
        }

        public IList<Project> GetProjectsByEmail(string email)
        {
            return _context.Projects.Where(q => q.Client.User.Email.Equals(email)).ToList();
        }

        public async Task Update(Project entity)
        {
            var user = _context.Users.Find(entity.Id);
            if (user == null)
            {
                return;
            }

            _context.Entry(entity).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();
        }
    }
}
