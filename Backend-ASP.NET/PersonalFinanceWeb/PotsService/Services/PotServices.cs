using Microsoft.EntityFrameworkCore;
using PotsService.Data;
using PotsService.DTOs;
using PotsService.Models;

namespace PotsService.Services
{
    public class PotServices : IPotServices
    {
        private readonly PotsDbContext _dbContext;
        public PotServices(PotsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<PotDto> CreatePot(PotDto dto)
        {
           var pot = new Pot
            {
                Name = dto.Name,
                TargetAmount = dto.TargetAmount,
                Color = dto.Color,
                CurrentAmount = dto.CurrentAmount,
            };
            _dbContext.Pots.Add(pot);
            _dbContext.SaveChanges();
            dto.Id = pot.Id;
            return Task.FromResult(dto);
        }

        public async Task<bool> DeletePot(int id)
        {
            var pot =await _dbContext.Pots.FindAsync(id);
            if (pot == null) return false;
            _dbContext.Pots.Remove(pot);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<PotDto>> GetAllPots()
        {
            return await _dbContext.Pots.Select(
            pot => new PotDto
            {
                Id = pot.Id,
                Name = pot.Name,
                TargetAmount = pot.TargetAmount,
                Color = pot.Color,
                CurrentAmount = pot.CurrentAmount
            }).ToListAsync();
        }

        public async Task<PotDto?> GetPotById(int id)
        {
            var pot =await _dbContext.Pots.FindAsync(id);
            if (pot == null) return null;
            return new PotDto
            {
                Id = pot.Id,
                Name = pot.Name,
                TargetAmount = pot.TargetAmount,
                Color = pot.Color,
                CurrentAmount = pot.CurrentAmount
            };
        }

        public async Task<bool> UpdatePot(int id, PotDto dto)
        {
            var pot = await _dbContext.Pots.FindAsync(id);
            if (pot == null) return false;

            pot.Name = dto.Name;
            pot.CurrentAmount = dto.CurrentAmount;
            pot.TargetAmount = dto.TargetAmount;
            pot.Color = dto.Color;

            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
