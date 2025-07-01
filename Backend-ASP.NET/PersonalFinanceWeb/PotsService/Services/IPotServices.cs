using PotsService.DTOs;

namespace PotsService.Services
{
    public interface IPotServices
    {
        Task<IEnumerable<PotDto>> GetAllPots();
        Task<PotDto?> GetPotById(int id);
        Task<PotDto> CreatePot(PotDto dto);
        Task<bool> UpdatePot(int id, PotDto dto);
        Task<bool> DeletePot(int id);
    }
}
