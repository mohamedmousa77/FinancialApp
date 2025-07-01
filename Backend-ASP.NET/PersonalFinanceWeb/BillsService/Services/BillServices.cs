using BillsService.Data;
using BillsService.DTOs;
using BillsService.Models;
using Microsoft.EntityFrameworkCore;

namespace BillsService.Services
{
    public class BillServices : IBillServices
    {
        private readonly BillDbContext _billDbContext;
        public BillServices(BillDbContext billDbContext)
        {
            _billDbContext = billDbContext;
        }
        public Task<BillDto> CreateBill(BillDto dto)
        {
            var Bill = new Bill
            {
                BillName = dto.BillName,
                Amount = dto.Amount,
                Date = dto.Date,
                Status = dto.Status
            };
            _billDbContext.Bills.Add(Bill); 
            _billDbContext.SaveChanges();
            dto.Id = Bill.Id; 
            return Task.FromResult(dto);
        }

        public async Task<bool> DeleteBill(int id)
        {
            var bill = await _billDbContext.Bills.FindAsync(id);
            if (bill == null) return false;
            _billDbContext.Bills.Remove(bill);
            await _billDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<BillDto>> GetAllBills()
        {
            return await _billDbContext.Bills.Select(
                bill => new BillDto
                {
                    Id = bill.Id,
                    BillName = bill.BillName,
                    Amount = bill.Amount,
                    Date = bill.Date,
                    Status = bill.Status
                }).ToListAsync();
        }

        public async Task<BillDto?> GetBillById(int id)
        {
            var bill =await _billDbContext.Bills.FindAsync(id);
            if (bill == null) return null;
            return new BillDto
            {
                Id = bill.Id,
                BillName = bill.BillName,
                Amount = bill.Amount,
                Date = bill.Date,
                Status = bill.Status
            };

        }

        public async Task<bool> UpdateBill(int id, BillDto dto)
        {
            var bill =await _billDbContext.Bills.FindAsync(id);
            if (bill == null) return false;
            
            bill.BillName = dto.BillName;
            bill.Amount = dto.Amount;
            bill.Date = dto.Date;
            bill.Status = dto.Status;

            await _billDbContext.SaveChangesAsync();
            return true;
        }
    }
}
