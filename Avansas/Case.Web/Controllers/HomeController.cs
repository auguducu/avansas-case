using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;
using Case.Business.Abstract;
using Case.Entities.Concrete;
using Case.Entities.Dto;
using Case.Entities.Enum;
using Case.Entities.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Case.Web.Models;
using Microsoft.AspNetCore.Authorization;

namespace Case.Web.Controllers;

public class HomeController : Controller
{
    private readonly IUsersService _usersService;

    public HomeController(IUsersService usersService)
    {
        _usersService = usersService;
    }

    [AuthorizeRoles(Roles.Admin, Roles.User)]
    public async Task<IActionResult> Index()
    {
        if (!User.Identity.IsAuthenticated)
            return RedirectToAction("Index", "Login");

        var users = await _usersService.GetListAsync();

        return View(users.Data);
    }

    [AuthorizeRoles(Roles.Admin, Roles.User)]
    public IActionResult NewUser()
    {
        return View();
    }

    [HttpPost]
    [AuthorizeRoles(Roles.Admin, Roles.User)]
    public async Task<SaveModelDto> NewUser(Users newUser)
    {
        SaveModelDto saveModelDto = new SaveModelDto();

        if (newUser.Email != null && newUser.Password != null)
        {
            try
            {
                var user = await _usersService.GetByEmailAsync(newUser.Email);

                if (user.Data != null)
                {
                    saveModelDto.Status = "error";
                    saveModelDto.Message = "Bu email adresi ile kayıtlı bir hesap bulunmaktadır.";

                    return saveModelDto;
                }

                if (user.Data == null)
                {
                    var password = Encrypt(newUser.Password);
                    var userAdd = new Users()
                    {
                        FirstName = newUser.FirstName,
                        LastName = newUser.LastName,
                        Email = newUser.Email,
                        PhoneNumber = newUser.PhoneNumber,
                        BirthDate = newUser.BirthDate,
                        Role = newUser.Role,
                        Password = password,
                        IsActive = true,
                    };

                    var result = await _usersService.AddAsync(userAdd);

                    if (result.Success)
                    {
                        saveModelDto.Status = "success";
                        saveModelDto.Message = "Teşekkürler. Kayıt işleminiz başarıyla gerçekleşmiştir.";

                        return saveModelDto;
                    }
                    else
                    {
                        saveModelDto.Status = "error";
                        saveModelDto.Message = "Bir şeyler ters gitti. Lütfen tekrar deneyiniz.";

                        return saveModelDto;
                    }
                }
            }
            catch (Exception e)
            {
                saveModelDto.Status = "error";
                saveModelDto.Message = "Bir şeyler ters gitti. Lütfen tekrar deneyiniz.";

                return saveModelDto;
            }

            return saveModelDto;
        }

        return saveModelDto;
    }

    [HttpPost]
    [AuthorizeRoles(Roles.Admin)]
    public async Task<SaveModelDto> DeleteUser(string id)
    {
        SaveModelDto saveModelDto = new SaveModelDto();

        if (!string.IsNullOrEmpty(id))
        {
            try
            {
                var user = await _usersService.GetByIdAsync(id);

                if (user.Data == null)
                {
                    saveModelDto.Status = "error";
                    saveModelDto.Message = "Böyle bir kullanıcı bulunmamaktadır.";

                    return saveModelDto;
                }

                if (user.Data != null)
                {
                    var result = await _usersService.DeleteAsync(user.Data);

                    if (result.Success)
                    {
                        saveModelDto.Status = "success";
                        saveModelDto.Message = "Kullanıcı başarıyla silinmiştir.";

                        return saveModelDto;
                    }
                    else
                    {
                        saveModelDto.Status = "error";
                        saveModelDto.Message = "Bir şeyler ters gitti. Lütfen tekrar deneyiniz.";

                        return saveModelDto;
                    }
                }
            }
            catch (Exception e)
            {
                saveModelDto.Status = "error";
                saveModelDto.Message = "Bir şeyler ters gitti. Lütfen tekrar deneyiniz.";

                return saveModelDto;
            }

            return saveModelDto;
        }

        return saveModelDto;
    }

    [HttpPost]
    [AuthorizeRoles(Roles.Admin)]
    public async Task<SaveModelDto> UpdateUser(Users users)
    {
        SaveModelDto saveModelDto = new SaveModelDto();

        if (users.Id != null)
        {
            try
            {
                var result = await _usersService.UpdateAsync(users);

                if (result.Success)
                {
                    saveModelDto.Status = "success";
                    saveModelDto.Message = "Kullanıcı başarıyla güncellenmiştir.";

                    return saveModelDto;
                }
                else
                {
                    saveModelDto.Status = "error";
                    saveModelDto.Message = "Bir şeyler ters gitti. Lütfen tekrar deneyiniz.";

                    return saveModelDto;
                }
            }
            catch (Exception e)
            {
                saveModelDto.Status = "error";
                saveModelDto.Message = "Bir şeyler ters gitti. Lütfen tekrar deneyiniz.";

                return saveModelDto;
            }

            return saveModelDto;
        }

        return saveModelDto;
    }

    private string Encrypt(string clearText)
    {
        string encryptionKey = "MAKV2SPBNI99212";
        byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
        using (Aes encryptor = Aes.Create())
        {
            Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(encryptionKey,
                new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
            encryptor.Key = pdb.GetBytes(32);
            encryptor.IV = pdb.GetBytes(16);
            using (MemoryStream ms = new MemoryStream())
            {
                using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                {
                    cs.Write(clearBytes, 0, clearBytes.Length);
                    cs.Close();
                }

                clearText = Convert.ToBase64String(ms.ToArray());
            }
        }

        return clearText;
    }

    private string Decrypt(string cipherText)
    {
        string encryptionKey = "MAKV2SPBNI99212";
        byte[] cipherBytes = Convert.FromBase64String(cipherText);
        using (Aes encryptor = Aes.Create())
        {
            Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(encryptionKey,
                new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
            encryptor.Key = pdb.GetBytes(32);
            encryptor.IV = pdb.GetBytes(16);
            using (MemoryStream ms = new MemoryStream())
            {
                using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                {
                    cs.Write(cipherBytes, 0, cipherBytes.Length);
                    cs.Close();
                }

                cipherText = Encoding.Unicode.GetString(ms.ToArray());
            }
        }

        return cipherText;
    }

    public class AuthorizeRolesAttribute : AuthorizeAttribute
    {
        public AuthorizeRolesAttribute(params Roles[] allowedRoles)
        {
            var allowedRolesAsStrings = allowedRoles.Select(x => Enum.GetName(typeof(Roles), x));
            Roles = string.Join(",", allowedRolesAsStrings);
        }
    }
}