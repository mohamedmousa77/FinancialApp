using BudgetsService.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetsService.Data
{
    public class BudgetsDbContext : DbContext
    {
        public BudgetsDbContext(DbContextOptions<BudgetsDbContext> options) : base(options)
        { }
        
        public DbSet<Budget> budgets { get; set; }
        
    }
}
