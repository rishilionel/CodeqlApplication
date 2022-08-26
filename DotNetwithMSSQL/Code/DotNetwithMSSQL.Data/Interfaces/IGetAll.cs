using System.Collections.Generic;

namespace DotNetwithMSSQL.Data.Interfaces
{
    public interface IGetAll<T> where T : class
    {
        IEnumerable<T> GetAll();
    }
}
