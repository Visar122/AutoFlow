using System.ComponentModel.DataAnnotations;

namespace Autoflow.Models.Logins
{
    public class Logins
    {
        [Key]
        public int  Id {  get; set; }

        public string  FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public byte[] PasswordSalt { get; set; } = []; //  laver en random salt for hver bruger  så ikk den sammen kode bytes  er anderledes :
                                                       //  User A:  "hello123" + random salt A  →  completely different hash -
                                                       //  User B:  "hello123" + random salt B  →  completely different hash
        public byte[] PasswordHash { get; set; } = []; // password lavet  til unreadable bytes 

      

        public string Status { get; set; }



    }
}
