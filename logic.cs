// This is sortof a logic tester
// The idea is for this to eventually be extrapolated across multiple files and classes and functions
// This is mostly to test my math logic and make the actual balancing work.
// Let's see how this goes

// This is attempt 3 at making this. The first one was going well in Python, but I'm trying to practice languages relevant to my new job,
// I tried javascript but oh my god I hate it so much. C# is nice, so I'm doing it here instead. 


// [myDateTime].AddMonths(1); is the key to all this......

using System;

namespace cashFlowBalancerLogic {

    static void Main(string[] args){
        Console.WriteLine("Cash Flow Balancer starting up...");
    }

    public class Bill{

        public Bill (string name, double amount, DateTime dueDate){
            public string Name {get; set;}
            public double Amount {get; set;}
            public DateTime dueDate {get; set;}

        }

    }
}
