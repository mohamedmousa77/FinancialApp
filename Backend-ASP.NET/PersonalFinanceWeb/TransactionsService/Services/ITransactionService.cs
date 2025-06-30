using TransactionsService.DTOs;

namespace TransactionsService.Services
{
    public interface ITransactionService
    {
        Task<IEnumerable<TransactionDto>> GetAllTransactions();
        Task<TransactionDto?> GetTransactionById(int id);
        Task<TransactionDto> CreateTransaction(TransactionDto dto);
        Task<bool> UpdateTransaction(int id, TransactionDto dto);
        Task<bool> DeleteTransaction(int id);
    }
}
