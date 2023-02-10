﻿namespace Application.Common.Interfaces
{
    public interface IRepository<T>
    {
        T? GetById(int id);

        T? Get(Func<T, bool> pred);

        Task<int> Add(T entity);

        Task Update(T entity);

        Task Delete(int id);
    }
}
