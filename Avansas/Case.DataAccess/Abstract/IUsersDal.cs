using Case.Core.DataAccess;
using Case.Entities.Concrete;

namespace Case.DataAccess.Abstract;

public interface IUsersDal : IEntityRepository<Users>
{
    
}