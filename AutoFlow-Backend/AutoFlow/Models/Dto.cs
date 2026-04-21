namespace AutoFlow.Models
{
    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class SignUpDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Status { get; set; }
        public string CarPlate { get; set; }
        public string? CarPlate2 { get; set; }
    }

    public class UpdateUserDto
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Password { get; set; }
        public string Status { get; set; }
        public string CarPlate { get; set; }
        public string? CarPlate2 { get; set; }

    }

    public class CreateOrderDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int ItemId { get; set; }
        public string ItemType { get; set; }   
        public string ItemName { get; set; }
        public decimal Price { get; set; }
        public string CardHolder { get; set; }
        public string Last4Digits { get; set; }
        public string ExpiryDate { get; set; }
    }
}
