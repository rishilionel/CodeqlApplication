using DotNetwithMySQL.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetwithMySQL.Data.Interfaces
{
    public interface IPersonRepository : IGetAll<Person>, ISave<Person>, IUpdate<Person, string>, IDelete<string>
    {
    }
}
