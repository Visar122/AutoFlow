using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Autoflow.Models.Carshop
{
    public class Carshop
    {
        [Key]

        public int CarId { get; set; }

        public string CarName { get; set; }

        public string CarModel { get; set; }

        public  int Year { get; set; }

         public string Category { get; set; }
        public string  CarDescription { get; set; }

        public string ImageUrl1 { get; set; }
        public string ImageUrl2 { get; set; }
        public string ImageUrl3 { get; set; }



        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }



    }
}
