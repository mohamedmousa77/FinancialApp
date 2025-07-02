namespace BillsService.DTOs
{
    public class BillDto
    {
        public int Id { get; set; }
        public string BillName { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Date { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
