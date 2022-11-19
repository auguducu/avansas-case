using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Case.Business.Abstract;
using Case.Entities.Concrete;
using Case.Entities.Dto;
using Case.Entities.Enum;
using Case.Entities.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace Case.Web.Controllers;

public class LoginController : Controller
{
    private readonly IUsersService _usersService;

    public LoginController(IUsersService usersService)
    {
        _usersService = usersService;
    }

    public IActionResult Index()
    {
        if (User.Identity.IsAuthenticated)
            return RedirectToAction("Index", "Home");
        
        return View();
    }
    
    public IActionResult LogOut()
    {
        HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return RedirectToAction("Index", "Login");
    }

    [HttpPost]
    public async Task<SaveModelDto> Index(LoginViewModel model)
    {
        SaveModelDto saveModelDto = new SaveModelDto();

        if (model.Email != null && model.Password != null)
        {
            try
            {
                var user = await _usersService.GetByEmailAsync(model.Email);

                if (user.Data == null)
                {
                    saveModelDto.Status = "error";
                    saveModelDto.Message = "Bu email adresi ile kayıtlı bir hesap bulunamadı.";

                    return saveModelDto;
                }

                if (user.Data != null)
                {
                    if (!user.Data.IsActive)
                    {
                        saveModelDto.Status = "error";
                        saveModelDto.Message = "Hesabınız pafis durumdadır. Lütfen yönetici ile iletişime geçiniz.";

                        return saveModelDto;
                    }
                    else
                    {
                        var password = Encrypt(model.Password);

                        if (user.Data.Password != password)
                        {
                            saveModelDto.Status = "error";
                            saveModelDto.Message = "Şifreniz yanlış.";

                            return saveModelDto;
                        }
                        else
                        {
                            string basharf = "";
                            var kullanici = user.Data.FullName.Split(" ");
                            for (int idx = 0; idx < kullanici.Length; idx++)
                            {
                                basharf += kullanici[idx].Substring(0, 1);
                            }
                            
                            var claims = new List<Claim>
                            {
                                new Claim(ClaimTypes.Name, user.Data.FullName),
                                new Claim(ClaimTypes.Email, user.Data.Email),
                                new Claim(ClaimTypes.Role, user.Data.Role.ToString()),
                                new Claim(ClaimTypes.GivenName, basharf),
                            };
                            
                            
                            var userIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                            var authProperties = new AuthenticationProperties();
                            
                            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(userIdentity), authProperties);

                            saveModelDto.Status = "success";
                            saveModelDto.Message = "Giriş başarılı.";

                            return saveModelDto;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                saveModelDto.Status = "error";
                saveModelDto.Message = "Bir şeyler ters gitti. Lütfen tekrar deneyiniz.";

                return saveModelDto;
            }
        }

        return saveModelDto;
    }

    [HttpPost]
    public async Task<SaveModelDto> Register(LoginViewModel model, IFormCollection collection)
    {
        SaveModelDto saveModelDto = new SaveModelDto();

        if (model.RegisterEmail != null && model.RegisterPassword != null)
        {
            try
            {
                var user = await _usersService.GetByEmailAsync(model.RegisterEmail);

                if (model.RegisterPassword != model.RegisterRePassword)
                {
                    saveModelDto.Status = "error";
                    saveModelDto.Message = "Şifreler birbirinden farklı olamaz!";

                    return saveModelDto;
                }

                if (user.Data != null)
                {
                    saveModelDto.Status = "error";
                    saveModelDto.Message = "Bu email adresi ile kayıtlı bir hesap bulunmaktadır.";

                    return saveModelDto;
                }
                
                if (user.Data == null)
                {
                    var password = Encrypt(model.RegisterPassword);
                    var userAdd = new Users()
                    {
                        FirstName = model.RegisterFirstName,
                        LastName = model.RegisterLastName,
                        Email = model.RegisterEmail,
                        PhoneNumber = model.RegisterPhoneNumber,
                        BirthDate = model.RegisterBirthDate,
                        Role = Roles.User,
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
}