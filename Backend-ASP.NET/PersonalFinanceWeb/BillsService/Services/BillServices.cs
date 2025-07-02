using BillsService.Data;
using BillsService.DTOs;
using BillsService.Models;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

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
            if (!DateTime.TryParseExact(dto.Date, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedDate))
            {
                Console.WriteLine("Formato data non valido. Usa dd/MM/yyyy");
            }
            var Bill = new Bill
            {
                BillName = dto.BillName,
                Amount = dto.Amount,
                Date = parsedDate,
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
                    Date = bill.Date.ToString("dd/MM/yyyy"),
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
                Date = bill.Date.ToString("dd/MM/yyyy"),
                Status = bill.Status
            };

        }

        public async Task<bool> UpdateBill(int id, BillDto dto)
        {
            if (!DateTime.TryParseExact(dto.Date, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedDate))
            {
                Console.WriteLine("Formato data non valido. Usa dd/MM/yyyy");
            }
            var bill =await _billDbContext.Bills.FindAsync(id);
            if (bill == null) return false;
            
            bill.BillName = dto.BillName;
            bill.Amount = dto.Amount;
            bill.Date = parsedDate;
            bill.Status = dto.Status;

            await _billDbContext.SaveChangesAsync();
            return true;
        }
    }
}
