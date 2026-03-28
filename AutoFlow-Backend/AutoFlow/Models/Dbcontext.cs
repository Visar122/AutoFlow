using Microsoft.EntityFrameworkCore;
using Autoflow.Models.Order;

namespace Autoflow.Models
{
    public class Dbcontext : DbContext
    {
        public Dbcontext(DbContextOptions options) :base(options){ }

        public DbSet<Logins.Logins> Logins { get; set; }

        public DbSet<Booking.Booking> Bookings { get; set; }

        public DbSet<Carshop.Carshop> Carshop { get; set; }

        public DbSet<ReserveParts.ReserveParts> ReserveParts { get; set; }
        public DbSet<Autoflow.Models.Order.Order> Order { get; set; } = default!;
      
    }
}
