using DotnetMongo.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DotnetMongo.Data.Interfaces
{
    public interface IPersonRepository : IGetAll<Person>, ISave<Person>, IUpdate<Person, string>, IDelete<string>
    {
    }
}
