using System.Collections.Generic;

namespace DotNetwithMySQL.Data.Interfaces
{
    public interface IGetAll<T> where T : class
    {
        IEnumerable<T> GetAll();
    }
}
