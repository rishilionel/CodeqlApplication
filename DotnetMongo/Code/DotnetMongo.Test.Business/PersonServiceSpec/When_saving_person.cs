using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using DotnetMongo.Entities.Entities;

namespace DotnetMongo.Test.Business.PersonServiceSpec
{
    public class When_saving_person : UsingPersonServiceSpec
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

            _personRepository.Save(_person).Returns(true);
        }
        public override void Because()
        {
            _result = subject.Save(_person);
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _personRepository.Received(1).Save(_person);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<Person>();

            _result.ShouldBe(_person);
        }
    }
}
