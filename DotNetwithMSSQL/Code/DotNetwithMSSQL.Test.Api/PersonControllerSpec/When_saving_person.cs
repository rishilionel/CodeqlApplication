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
    public class When_saving_person : UsingPersonControllerSpec
    {
        private ActionResult<Person> _result;

        private Person _person;

        public override void Context()
        {
            base.Context();

            _person = new Person
            {
                Name = "Name"
            };

            _personService.Save(_person).Returns(_person);
        }
        public override void Because()
        {
            _result = subject.Save(_person);
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _personService.Received(1).Save(_person);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<Person>();

            var resultList = (Person)resultListObject;

            resultList.ShouldBe(_person);
        }
    }
}
