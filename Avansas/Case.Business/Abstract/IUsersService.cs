using Case.Core.Utilities.Results;
using Case.Entities.Concrete;

namespace Case.Business.Abstract;

public interface IUsersService
{
    Task<IDataResult<Users>> AddAsync(Users model);
    Task<IDataResult<Users>> UpdateAsync(Users model);
    Task<IDataResult<Users>> DeleteAsync(Users model);
    Task<IDataResult<List<Users>>> GetListAsync();
    Task<IDataResult<Users>> GetByIdAsync(string? id);
    Task<IDataResult<Users>> GetByEmailAsync(string? email);
    Task<IDataResult<Users>> SignInAsync(string? email, string? password); 
}