using System;
using System.ComponentModel.DataAnnotations;

namespace Case.Core.Entities
{
    public class BaseEntity
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public BaseEntity()
        {
            Id = Guid.NewGuid();
            IsActive = true;
            CreateDate = DateTime.UtcNow;
            IsDeleted = false;
        }
    }
}

