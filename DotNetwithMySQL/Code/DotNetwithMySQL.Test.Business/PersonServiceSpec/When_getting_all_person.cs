using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using DotNetwithMySQL.Entities.Entities;

namespace DotNetwithMySQL.Test.Business.PersonServiceSpec
{
    public class When_getting_all_person : UsingPersonServiceSpec
    {
        private IEnumerable<Person> _result;

        private IEnumerable<Person> _all_person;
        private Person _person;

        public override void Context()
        {
            base.Context();

            _person = new Person{
                Name = "Name"
            };

            _all_person = new List<Person> { _person};
            _personRepository.GetAll().Returns(_all_person);
        }
        public override void Because()
        {
            _result = subject.GetAll();
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _personRepository.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<List<Person>>();

            List<Person> resultList = _result as List<Person>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_person);
        }
    }
}
