using static System.Runtime.InteropServices.JavaScript.JSType;

namespace PotsService.Models
{
    public class Pot
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal TargetAmount { get; set; }
        public decimal CurrentAmount { get; set; }
        public string Color { get; set; }
    }
}