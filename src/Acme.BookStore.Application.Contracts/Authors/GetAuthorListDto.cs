using Volo.Abp.Application.Dtos;

namespace Acme.BookStore.Authors;

public class GetAuthorListDto : PagedAndSortedResultRequestDto
// PagesAndSortedResultRequestDTo provides SkipCount, MaxResultCount, Sorting properties
// ABP provdes a base class for DTOs that are used for paging and sorting
{
    public string? Filter { get; set; }
}