using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using Microsoft.AspNetCore.Mvc;
using DotNetwithMSSQL.Entities.Entities;

namespace DotNetwithMSSQL.Test.Api.PersonControllerSpec
{
    public class When_getting_all_person : UsingPersonControllerSpec
    {
        private ActionResult<IEnumerable<Person>> _result;

        private IEnumerable<Person> _all_person;
        private Person _person;

        public override void Context()
        {
            base.Context();

            _person = new Person{
                Name = "Name"
            };

            _all_person = new List<Person> { _person};
            _personService.GetAll().Returns(_all_person);
        }
        public override void Because()
        {
            _result = subject.Get();
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _personService.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<List<Person>>();

            List<Person> resultList = resultListObject as List<Person>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_person);
        }
    }
}
