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
public string ImageUrl1 { get; set; }
        public string ImageUrl2 { get; set; }
        public string? ImageUrl3 { get; set; }
        public string? ImageUrl4 { get; set; }

        public int Km {  get; set; }

        public string Fuel {  get; set; }

        public string Horsepower { get; set; }

        public string TopSpeed { get; set; }


         public int Afgift { get; set; }


        public string Geartype { get; set; }

        public string Color { get; set; }



        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }



    }
}
