using System.Collections.Generic;
using DotNetwithMSSQL.Business.Interfaces;
using DotNetwithMSSQL.Entities.Entities;
using Microsoft.AspNetCore.Mvc;

namespace DotNetwithMSSQL.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        IPersonService _PersonService;
        public PersonController(IPersonService PersonService)
        {
            _PersonService = PersonService;
        }

        // GET: api/Person
        [HttpGet]
        public ActionResult<IEnumerable<Person>> Get()
        {
            return Ok(_PersonService.GetAll());
        }

        [HttpPost]
        public ActionResult<Person> Save(Person Person)
        {
            return Ok(_PersonService.Save(Person));

        }

        [HttpPut("{id}")]
        public ActionResult<Person> Update([FromRoute] string id, Person Person)
        {
            return Ok(_PersonService.Update(id, Person));

        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete([FromRoute] string id)
        {
            return Ok(_PersonService.Delete(id));

        }


    }
}
