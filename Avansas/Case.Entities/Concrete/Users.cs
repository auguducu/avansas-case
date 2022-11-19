using System.ComponentModel.DataAnnotations.Schema;
using Case.Core.Entities;
using Case.Entities.Enum;

namespace Case.Entities.Concrete;

public class Users : BaseEntity, IEntity
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public long? PhoneNumber { get; set; }
    public DateTime BirthDate { get; set; }
    public string? Password { get; set; }
    public Roles Role { get; set; }

    [NotMapped] public string? FullName => $"{FirstName} {LastName}";
}