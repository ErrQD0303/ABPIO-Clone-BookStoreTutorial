import { ListService, PagedResultDto } from "@abp/ng.core";
import { Confirmation, ConfirmationService } from "@abp/ng.theme.shared";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbDateNativeAdapter, NgbDateAdapter } from "@ng-bootstrap/ng-bootstrap";
import { AuthorDto, AuthorService } from "@proxy/authors";

@Component({
  selector: "app-author",
  templateUrl: "./author.component.html",
  styleUrl: "./author.component.scss",
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class AuthorComponent implements OnInit {
  author = { items: [], totalCount: 0 } as PagedResultDto<AuthorDto>;

  isModalOpen = false;

  form: FormGroup;

  selectedAuthor = {} as AuthorDto;

  constructor(
    public readonly list: ListService,
    private authorService: AuthorService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit(): void {
    const authorStreamCreator = query => this.authorService.getList(query);

    this.list.hookToQuery(authorStreamCreator).subscribe(response => {
      this.author = response;
    });
  }

  createAuthor() {
    this.selectedAuthor = {} as AuthorDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editAuthor(id: string) {
    this.authorService.get(id).subscribe(author => {
      this.selectedAuthor = author;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  delete(id: string) {
    this.confirmation.warn("::AreYouSureToDelete", "::AreYouSure").subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        this.authorService.delete(id).subscribe(() => {
          this.list.get();
        }); // Subscribing to the delete author service, which will be executed when the user confirms the deletion
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.selectedAuthor.name || "", Validators.required],
      birthDate: [
        this.selectedAuthor.birthDate ? new Date(this.selectedAuthor.birthDate) : null,
        Validators.required,
      ],
      shortBio: [
        this.selectedAuthor.shortBio ? this.selectedAuthor.shortBio : null,
        Validators.required,
      ],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    if (this.selectedAuthor.id) {
      this.authorService.update(this.selectedAuthor.id, this.form.value).subscribe(() => {
        this.isModalOpen = false;
        this.form.reset(); // reset form's value to default
        this.list.get(); // reload the list's page
      });
    } else {
      this.authorService.create(this.form.value).subscribe(() => {
        this.isModalOpen = false;
        this.form.reset();
        this.list.get();
      });
    }
  }
}