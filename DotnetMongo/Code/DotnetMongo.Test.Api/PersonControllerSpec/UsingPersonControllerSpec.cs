using NSubstitute;
using DotnetMongo.Test.Framework;
using DotnetMongo.Api.Controllers;
using DotnetMongo.Business.Interfaces;


namespace DotnetMongo.Test.Api.PersonControllerSpec
{
    public abstract class UsingPersonControllerSpec : SpecFor<PersonController>
    {
        protected IPersonService _personService;

        public override void Context()
        {
            _personService = Substitute.For<IPersonService>();
            subject = new PersonController(_personService);

        }

    }
}
