using Microsoft.EntityFrameworkCore;
using TransactionsService.Data;
using TransactionsService.DTOs;
using TransactionsService.Models;

namespace TransactionsService.Services
{
    
    public class TransactionService : ITransactionService
    {
        private readonly TransactionsDbContext _context;

        public TransactionService(TransactionsDbContext transactionsDbContext)
        {
            _context = transactionsDbContext;   
        }
        public async Task<IEnumerable<TransactionDto>> GetAllTransactions()
        {
            return await _context.Transactions
                .Select(t => new TransactionDto
                {
                    Id = t.Id,
                    Name = t.Name,
                    Amount = t.Amount,
                    TransactionDate = t.TransactionDate,
                    Category = t.Category
                })
                .ToListAsync();
        }

        public async Task<TransactionDto?> GetTransactionById(int id)
        {
            var t = await _context.Transactions.FindAsync(id);
            if (t == null) return null;

            return new TransactionDto
            {
                Id = t.Id,
                Name = t.Name,
                Amount = t.Amount,
                TransactionDate = t.TransactionDate,
                Category = t.Category
            };
        }

        public async Task<TransactionDto> CreateTransaction(TransactionDto dto)
        {
            var entity = new Transaction
            {
                Name = dto.Name,
                Amount = dto.Amount,
                TransactionDate = dto.TransactionDate,
                Category = dto.Category
            };

            _context.Transactions.Add(entity);
            await _context.SaveChangesAsync();

            dto.Id = entity.Id;
            return dto;
        }

        public async Task<bool> UpdateTransaction(int id, TransactionDto dto)
        {
            var t = await _context.Transactions.FindAsync(id);
            if (t == null) return false;

            t.Name = dto.Name;
            t.Amount = dto.Amount;
            t.TransactionDate = dto.TransactionDate;
            t.Category = dto.Category;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTransaction(int id)
        {
            var t = await _context.Transactions.FindAsync(id);
            if (t == null) return false;

            _context.Transactions.Remove(t);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
