using Microsoft.EntityFrameworkCore;
using TransactionsService.Models;

namespace TransactionsService.Data
{
    public class TransactionsDbContext : DbContext
    {
        public TransactionsDbContext(DbContextOptions<TransactionsDbContext> options)
            : base(options) { }

        public DbSet<Transaction> Transactions { get; set; }
    }
}
