using System.ComponentModel.DataAnnotations;

namespace Autoflow.Models.Booking
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }

        public string Tlf { get; set; }

        public string ServiceType { get; set; }


   
        public DateTime BookingDate { get; set; }
        public TimeSpan BookingTime { get; set; }


        [Required]
        public string CarPlate { get; set; } 
       
        public string Note { get; set; } = "";

        public string Status { get; set; } = "";


    }
}
