namespace AutoFlow.Models
{
    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class SignUpDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string Status { get; set; }
    }
}
