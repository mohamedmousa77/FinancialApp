namespace BudgetsService.Models
{
    public class Budget
    {
        public int Id { get; set; }
        public string Category { get; set; }

        public int Amount { get; set; }

        public int Spent { get; set; }

        public string Color { get; set; }
    }
}
