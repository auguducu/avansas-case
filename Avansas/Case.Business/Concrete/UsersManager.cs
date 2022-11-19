using Case.Business.Abstract;
using Case.Core.Utilities.Results;
using Case.DataAccess.Abstract;
using Case.Entities.Concrete;

namespace Case.Business.Concrete;

public class UsersManager : IUsersService
{
    private readonly IUsersDal _usersDal;

    public UsersManager(IUsersDal usersDal)
    {
        _usersDal = usersDal;
    }

    public async Task<IDataResult<Users>> AddAsync(Users model)
    {
        var result = await _usersDal.AddAsync(model);
        
        if (result)
        {
            return new SuccessDataResult<Users>(model);
        }

        return new ErrorDataResult<Users>("Not user added");
    }

    public async Task<IDataResult<Users>> UpdateAsync(Users model)
    {
        var result = await _usersDal.UpdateAsync(model);
        
        if (result)
        {
            return new SuccessDataResult<Users>(model);
        }
        
        return new ErrorDataResult<Users>("Not user deleted");
    }

    public async Task<IDataResult<Users>> DeleteAsync(Users model)
    {
        model.IsDeleted = true;
        var result = await _usersDal.UpdateAsync(model);
        
        if (result)
        {
            return new SuccessDataResult<Users>(model);
        }
        
        return new ErrorDataResult<Users>("Not user deleted");
    }

    public async Task<IDataResult<List<Users>>> GetListAsync()
    {
        return new SuccessDataResult<List<Users>>(await _usersDal.GetListAsync(x=> !x.IsDeleted));
    }

    public async Task<IDataResult<Users>> GetByIdAsync(string? id)
    {
        return new SuccessDataResult<Users>(await _usersDal.GetAsync(x => x.Id.ToString() == id && !x.IsDeleted));
    }

    public async Task<IDataResult<Users>> GetByEmailAsync(string? email)
    {
        return new SuccessDataResult<Users>(await _usersDal.GetAsync(x => x.Email == email && !x.IsDeleted));
    }

    public async Task<IDataResult<Users>> SignInAsync(string? email, string? password)
    {
        var user = await _usersDal.GetAsync(x => x.Email == email && x.Password == password && !x.IsDeleted);
        
        if (user != null)
        {
            return new SuccessDataResult<Users>(user);
        }
        else
        {
            return new ErrorDataResult<Users>("Kullanıcı adı veya şifre hatalı");
        }
    }
}