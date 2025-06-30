namespace TransactionsService.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public string Category { get; set; }
    }
}