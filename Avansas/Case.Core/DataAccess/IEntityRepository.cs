using System;
using System.Linq.Expressions;
using System.Security.Principal;
using Case.Core.Entities;

namespace Case.Core.DataAccess
{
    public interface IEntityRepository<T> where T : class, IEntity
    {
        Task<T> GetAsync(Expression<Func<T, bool>> filter, bool lazyLoading = false);
        Task<List<T>> GetListAsync(Expression<Func<T, bool>> filter = null, bool lazyLoading = false);
        Task<bool> AddAsync(T entity);
        Task<bool> UpdateAsync(T entity);
    }
}

