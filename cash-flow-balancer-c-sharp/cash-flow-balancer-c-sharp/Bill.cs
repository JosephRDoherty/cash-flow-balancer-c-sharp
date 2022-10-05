using System;
using System.Runtime.CompilerServices;

namespace BillSpace
{
    public class Bill
    {
        public string Name { get; set; }
        public double Amount { get; set; }
        public DateTime DueDate { get; set; }


        public Bill(string name, double amount, DateTime dueDate) {

            this.Name = name;
            this.Amount = amount;
            this.DueDate = dueDate;
            Console.WriteLine("Bill Constructed");

        }
    }
}


