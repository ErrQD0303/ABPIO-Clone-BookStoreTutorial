using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shouldly;
using Volo.Abp.Modularity;
using Xunit;

namespace Acme.BookStore.Authors;

public abstract class AuthorAppService_Tests<TStartUpModule> : BookStoreApplicationTestBase<TStartUpModule>
where TStartUpModule : IAbpModule
{
    private readonly IAuthorAppService _authorAppService;

    protected AuthorAppService_Tests()
    {
        _authorAppService = GetRequiredService<IAuthorAppService>(); // GetRequiredService method is used to get the service from the service collection
    }

    // TODO: Add your test methods here
    [Fact]
    public async Task Should_Get_all_Authors_Without_Any_Filter()
    {
        var result = await _authorAppService.GetListAsync(new GetAuthorListDto());

        result.TotalCount.ShouldBeGreaterThanOrEqualTo(2);
        result.Items.ShouldContain(author => author.Name == "George Orwell");
        result.Items.ShouldContain(author => author.Name == "Douglas Adams");
    }

    [Fact]
    public async Task Should_Get_Filtered_Authors()
    {
        var result = await _authorAppService.GetListAsync(
            new GetAuthorListDto
            {
                Filter = "Douglas"
            }
        );

        result.TotalCount.ShouldBe(1);
        result.Items.ShouldContain(author => author.Name == "Douglas Adams");
        result.Items.ShouldNotContain(author => author.Name == "George Orwell");
    }

    [Fact]
    public async Task Should_Create_A_New_Author()
    {
        var authorDto = await _authorAppService.CreateAsync(
            new CreateAuthorDto
            {
                Name = "Edward Bellamy",
                BirthDate = new DateTime(1850, 05, 22),
                ShortBio = "Edward Bellamy was an American author..."
            }
        );

        authorDto.Id.ShouldNotBe(Guid.Empty);
        authorDto.Name.ShouldBe("Edward Bellamy");
    }

    [Fact]
    public async Task Should_Not_Allow_To_Create_Duplicate_Author()
    {
        await Assert.ThrowsAsync<AuthorAlreadyExistsException>(async () =>
        {
            await _authorAppService.CreateAsync(
                new CreateAuthorDto
                {
                    Name = "George Orwell",
                    BirthDate = new DateTime(1903, 06, 25),
                    ShortBio = "..."
                }
            );
        });
    }
}