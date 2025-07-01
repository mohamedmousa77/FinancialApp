using Microsoft.AspNetCore.Mvc;
using PotsService.DTOs;
using PotsService.Services;

namespace PotsService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PotsController : ControllerBase
    {
        private readonly IPotServices _potsService;

        public PotsController(IPotServices potsService)
        {
            _potsService = potsService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PotDto>>> GetAll()
        {
            var transactions = await _potsService.GetAllPots();
            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PotDto>> Get(int id)
        {
            var t = await _potsService.GetPotById(id);
            if (t == null) return NotFound();

            return Ok(t);
        }

        [HttpPost]
        public async Task<ActionResult<PotDto>> Create([FromBody] PotDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newTransaction = await _potsService.CreatePot(dto);

            return CreatedAtAction(nameof(Get), new { id = newTransaction.Id }, newTransaction);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PotDto dto)
        {
            if (id != dto.Id) return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            bool success = await _potsService.UpdatePot(id, dto);

            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool success = await _potsService.DeletePot(id);

            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
