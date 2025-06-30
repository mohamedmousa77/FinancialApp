using BudgetsService.DTOs;

namespace BudgetService.Services
{
    public interface IBudgetService
    {
        Task<IEnumerable<BudgetDto>> GetAllBudgets();
        Task<BudgetDto?> GetBudgetById(int id);
        Task<BudgetDto> CreateBudget(BudgetDto dto);
        Task<bool> UpdateBudget(int id, BudgetDto dto);
        Task<bool> DeleteBudget(int id);
    }
}
