using BudgetsService.Data;
using BudgetsService.DTOs;
using BudgetsService.Models;
using BudgetsService.Services;
using Microsoft.EntityFrameworkCore;

namespace BudgetsService.Services
{
    public class BudgetService : IBudgetServices
    {
        private readonly BudgetsDbContext _dbContext;
        public BudgetService(BudgetsDbContext dbContext) {
            _dbContext = dbContext;
        }
        public async Task<BudgetDto> CreateBudget(BudgetDto dto)
        {
            var b = new Budget
            {
                Amount = dto.Amount,
                Category = dto.Category,
                Color = dto.Color,
                Spent = dto.Spent,
            };

            _dbContext.budgets.Add(b);
            await _dbContext.SaveChangesAsync();
            b.Id = dto.Id;
            return dto;
        }

        public async Task<bool> DeleteBudget(int id)
        {
            var b = await _dbContext.budgets.FindAsync(id);
            if (b == null) return false;

            _dbContext.budgets.Remove(b);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<BudgetDto>> GetAllBudgets()
        {
            return await _dbContext.budgets.Select(budget => 
            new BudgetDto 
            {   
                Id = budget.Id, 
                Amount = budget.Amount, 
                Category = budget.Category,
                Color = budget.Color,
                Spent=budget.Spent,
            }).ToListAsync();
        }

        public async Task<BudgetDto?> GetBudgetById(int id)
        {
            var b = await _dbContext.budgets.FindAsync(id);
            if (b == null) return null;
            return new BudgetDto
            {
                Id = b.Id,
                Amount = b.Amount,
                Category = b.Category,
                Color = b.Color,
                Spent = b.Spent,
            };
        }

        public async Task<bool> UpdateBudget(int id, BudgetDto dto)
        {
            var b = await _dbContext.budgets.FindAsync(id);
            if (b == null) return false;

            b.Color = dto.Color;
            b.Spent = dto.Spent;
            b.Amount = dto.Amount;
            b.Category = dto.Category;

            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
