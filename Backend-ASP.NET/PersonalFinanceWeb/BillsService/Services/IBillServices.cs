using BillsService.DTOs;

namespace BillsService.Services
{
    public interface IBillServices
    {
        Task<IEnumerable<BillDto>> GetAllBills();
        Task<BillDto?> GetBillById(int id);
        Task<BillDto> CreateBill(BillDto dto);
        Task<bool> UpdateBill(int id, BillDto dto);
        Task<bool> DeleteBill(int id);
    }
}
