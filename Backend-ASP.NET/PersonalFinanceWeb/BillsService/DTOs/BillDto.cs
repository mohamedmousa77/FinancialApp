namespace BillsService.DTOs
{
    public class BillDto
    {
        public int Id { get; set; }
        public string BillName { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
    }
}
