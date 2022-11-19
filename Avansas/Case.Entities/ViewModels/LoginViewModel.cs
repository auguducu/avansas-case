namespace Case.Entities.ViewModels;

public class LoginViewModel
{
    public string? Email { get; set; }
    public string? Password { get; set; }
    public string? RegisterFirstName { get; set; }
    public string? RegisterLastName { get; set; }
    public string? RegisterEmail{ get; set; }
    public string? RegisterPassword { get; set; }
    public string? RegisterRePassword { get; set; }    
    public long? RegisterPhoneNumber { get; set; }
    public DateTime RegisterBirthDate { get; set; }
}