using System.ComponentModel.DataAnnotations;

namespace Autoflow.Models.ReserveParts
{
    public class ReserveParts
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Category { get; set; }

        public decimal Price { get; set; }
        public string Description { get; set; }

        public string ImageUrl1 { get; set; }

        public string ImageUrl2 { get; set; }
        public string ImageUrl3 { get; set; }

        public int stock { get; set; }


    }
}
