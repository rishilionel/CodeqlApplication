using DotNetwithMSSQL.Business.Interfaces;
using DotNetwithMSSQL.Data.Interfaces;
using DotNetwithMSSQL.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetwithMSSQL.Business.Services
{
    public class PersonService : IPersonService
    {
        IPersonRepository _PersonRepository;

        public PersonService(IPersonRepository PersonRepository)
        {
           this._PersonRepository = PersonRepository;
        }
        public IEnumerable<Person> GetAll()
        {
            return _PersonRepository.GetAll();
        }

        public Person Save(Person Person)
        {
            _PersonRepository.Save(Person);
            return Person;
        }

        public Person Update(string id, Person Person)
        {
            return _PersonRepository.Update(id, Person);
        }

        public bool Delete(string id)
        {
            return _PersonRepository.Delete(id);
        }

    }
}
