using BillsService.Models;
using Microsoft.EntityFrameworkCore;

namespace BillsService.Data
{
    public class BillDbContext: DbContext
    {
        public BillDbContext(DbContextOptions<BillDbContext> options) : base(options)
        { }
        public DbSet<Bill> Bills { get; set; }
    }
}
