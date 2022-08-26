using DotNetwithMSSQL.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetwithMSSQL.Business.Interfaces
{
    public interface IPersonService
    {      
        IEnumerable<Person> GetAll();
        Person Save(Person classification);
        Person Update(string id, Person classification);
        bool Delete(string id);

    }
}
