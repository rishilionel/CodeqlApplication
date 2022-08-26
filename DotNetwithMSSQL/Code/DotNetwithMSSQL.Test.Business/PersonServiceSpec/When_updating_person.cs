using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using DotNetwithMSSQL.Entities.Entities;


namespace DotNetwithMSSQL.Test.Business.PersonServiceSpec
{
    public class When_updating_person : UsingPersonServiceSpec
    {
        private Person _result;
        private Person _person;

        public override void Context()
        {
            base.Context();

            _person = new Person
            {
                Name = "Name"
            };

            _personRepository.Update(_person.Id, _person).Returns(_person);
            
        }
        public override void Because()
        {
            _result = subject.Update(_person.Id, _person);
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _personRepository.Received(1).Update(_person.Id, _person);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<Person>();

            _result.ShouldBe(_person);
        }
    }
}
