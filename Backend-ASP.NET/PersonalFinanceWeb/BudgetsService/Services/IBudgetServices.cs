using BudgetsService.DTOs;

namespace BudgetsService.Services
{
    public interface IBudgetServices
    {
        Task<IEnumerable<BudgetDto>> GetAllBudgets();
        Task<BudgetDto?> GetBudgetById(int id);
        Task<BudgetDto> CreateBudget(BudgetDto dto);
        Task<bool> UpdateBudget(int id, BudgetDto dto);
        Task<bool> DeleteBudget(int id);
    }
}
