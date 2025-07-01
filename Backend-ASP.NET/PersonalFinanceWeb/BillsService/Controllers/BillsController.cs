using BillsService.DTOs;
using BillsService.Services;
using Microsoft.AspNetCore.Mvc;

namespace BillsService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BillsController : ControllerBase
    {
        private readonly IBillServices _billsService;
        public BillsController(IBillServices billsService)
        {
            _billsService = billsService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BillDto>>> GetAll()
        {
            var bills = await _billsService.GetAllBills();
            return Ok(bills);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<BillDto>> Get(int id)
        {
            var bill = await _billsService.GetBillById(id);
            if (bill == null) return NotFound();
            return Ok(bill);
        }
        [HttpPost]
        public async Task<ActionResult<BillDto>> Create([FromBody] BillDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var newBill = await _billsService.CreateBill(dto);
            return CreatedAtAction(nameof(Get), new { id = newBill.Id }, newBill);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] BillDto dto)
        {
            if (id != dto.Id) return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            bool success = await _billsService.UpdateBill(id, dto);
            if (!success)
                return NotFound();
            return NoContent();
        }
    }
}
