import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { debounceTime, Observable } from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataPage } from '../../data/model/common/data-page.interface';
import { DocumentParagraphsState } from './state/document-paragraphs.state';
import { DocumentParagraph } from '../../data/model/document/document-paragraph.interface';
import { ActionDocumentParagraphs } from './state/document-paragraphs.actions';
import { ActivatedRoute } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DocumentParagraphContentComponent } from './document-paragraph-content/document-paragraph-content.component';

@Component({
  selector: 'app-document-paragraphs',
  templateUrl: './document-paragraphs.component.html',
  styleUrls: ['./document-paragraphs.component.scss'],
})
export class DocumentParagraphsComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly modalService: NzModalService,
  ) {}

  @Select(DocumentParagraphsState.documentParagraphs)
  documentParagraphs$!: Observable<DataPage<DocumentParagraph>>;

  @Select(DocumentParagraphsState.pageSize)
  pageSize$!: Observable<number>;

  @Select(DocumentParagraphsState.document)
  document$!: Observable<Document>;

  searchFormControl?: FormControl;

  private documentId = -1;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const documentId = params['documentId'];
      this.documentId = documentId;

      this.store.dispatch(ActionDocumentParagraphs.init({ documentId }));
    });

    this.searchFormControl = this.fb.control(undefined);
    this.searchFormControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) =>
        this.store.dispatch(
          ActionDocumentParagraphs.searchQueryChanged({ searchQuery: value }),
        ),
      );
  }

  onCurrentPageChanged(page: number) {
    this.store.dispatch(ActionDocumentParagraphs.pageChanged({ page }));
  }

  onPageSizeChanged(pageSize: number) {
    this.store.dispatch(ActionDocumentParagraphs.pageSizeChanged({ pageSize }));
  }

  onShowDocumentParagraphPressed(documentParagraph: DocumentParagraph) {
    this.modalService.create({
      nzWidth: '60%',
      nzContent: DocumentParagraphContentComponent,
      nzComponentParams: { documentParagraph },
      nzFooter: null,
    });
  }

  onUpdateDocumentParagraphPressed(documentParagraph: DocumentParagraph) {
    this.store.dispatch(
      new Navigate([`/documents/${this.documentId}/paragraphs/new`], {
        documentParagraphId: documentParagraph.id,
      }),
    );
  }

  onDeleteDocumentParagraphPressed(documentParagraph: DocumentParagraph) {
    this.store.dispatch(
      ActionDocumentParagraphs.deleteDocumentParagraph({ documentParagraph }),
    );
  }

  onNewDocumentParagraphPressed() {
    this.store.dispatch(
      new Navigate([`/documents/${this.documentId}/paragraphs/new`]),
    );
  }
}
