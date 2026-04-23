using System.ComponentModel.DataAnnotations;

namespace Autoflow.Models.Order
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int ItemId { get; set; }
        public string ItemType { get; set; }
        public string ItemName { get; set; }
        public string? ImageUrl { get; set; }
        public decimal Price { get; set; }
        public string Status { get; set; }  
        public DateTime OrderDate { get; set; } = DateTime.Now;

        






    }
}
