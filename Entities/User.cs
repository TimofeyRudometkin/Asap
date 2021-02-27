using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asap.TaskWebApplication.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public SortedList<Service, int> listOfServices = new SortedList<Service, int>();
    }
}
