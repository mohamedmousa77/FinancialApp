using Microsoft.EntityFrameworkCore;
using PotsService.Models;

namespace PotsService.Data
{
    public class PotsDbContext : DbContext
    {
        public PotsDbContext(DbContextOptions<PotsDbContext> options) : base(options)
        { }

        public DbSet<Pot> Pots { get; set; }
    }
}
