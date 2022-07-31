import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  DeleteDocumentParagraphFailure,
  DocumentService,
  GetDocumentFailure,
} from '../../../data/services/document.service';
import { DataPage } from '../../../data/model/common/data-page.interface';
import { DocumentParagraph } from '../../../data/model/document/document-paragraph.interface';
import {
  DocumentParagraphsDeleteDocumentParagraph,
  DocumentParagraphsInit,
  DocumentParagraphsPageChanged,
  DocumentParagraphsPageSizeChanged,
  DocumentParagraphsSearchQueryChanged,
} from './document-paragraphs.actions';
import { Document } from '../../../data/model/document/document.interface';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface DocumentParagraphsStateModel {
  documentParagraphs: DataPage<DocumentParagraph>;
  document?: Document;
  pageSize: number;
  searchQuery: string;
}

const DOCUMENT_PARAGRAPHS_STATE_TOKEN =
  new StateToken<DocumentParagraphsStateModel>('document_paragraphs');

@State<DocumentParagraphsStateModel>({
  name: DOCUMENT_PARAGRAPHS_STATE_TOKEN,
  defaults: {
    documentParagraphs: { data: [], totalCount: 0 },
    pageSize: 10,
    searchQuery: '',
  },
})
@Injectable()
export class DocumentParagraphsState {
  constructor(
    private readonly documentService: DocumentService,
    private readonly notificationService: NzNotificationService,
  ) {}

  private currentPage = 1;
  private documentId = -1;

  @Selector([DOCUMENT_PARAGRAPHS_STATE_TOKEN])
  static documentParagraphs(
    state: DocumentParagraphsStateModel,
  ): DataPage<DocumentParagraph> {
    return state.documentParagraphs;
  }

  @Selector([DOCUMENT_PARAGRAPHS_STATE_TOKEN])
  static pageSize(state: DocumentParagraphsStateModel): number {
    return state.pageSize;
  }

  @Selector([DOCUMENT_PARAGRAPHS_STATE_TOKEN])
  static document(state: DocumentParagraphsStateModel): Document | undefined {
    return state.document;
  }

  @Action(DocumentParagraphsInit)
  async init(
    ctx: StateContext<DocumentParagraphsStateModel>,
    action: DocumentParagraphsInit,
  ) {
    this.currentPage = 1;
    this.documentId = action.payload.documentId;

    const state = ctx.getState();

    await this.getDocumentParagraphs(
      this.currentPage,
      state.pageSize,
      state.searchQuery,
      ctx,
    );

    this.documentService.getDocument(action.payload.documentId).subscribe({
      next: (res) => ctx?.patchState({ document: res }),
      error: (err: GetDocumentFailure) => {
        switch (err) {
          case 'DocumentNotFound':
            this.notificationService.error(
              'Not found',
              `Document with id ${action.payload.documentId} could not be found`,
            );
            break;
          default:
            this.notificationService.error('Error', `Unknown error`);
            break;
        }
      },
    });
  }

  @Action(DocumentParagraphsPageSizeChanged)
  async pageSizeChanged(
    ctx: StateContext<DocumentParagraphsStateModel>,
    action: DocumentParagraphsPageSizeChanged,
  ) {
    this.currentPage = 1;

    const state = ctx.getState();

    await this.getDocumentParagraphs(
      this.currentPage,
      action.payload.pageSize,
      state.searchQuery,
      ctx,
    );
  }

  @Action(DocumentParagraphsPageChanged)
  async pageChanged(
    ctx: StateContext<DocumentParagraphsStateModel>,
    action: DocumentParagraphsPageChanged,
  ) {
    const state = ctx.getState();

    await this.getDocumentParagraphs(
      action.payload.page,
      state.pageSize,
      state.searchQuery,
      ctx,
    );
  }

  @Action(DocumentParagraphsSearchQueryChanged)
  async searchQueryChanged(
    ctx: StateContext<DocumentParagraphsStateModel>,
    action: DocumentParagraphsSearchQueryChanged,
  ) {
    this.currentPage = 1;
    const state = ctx.getState();

    await this.getDocumentParagraphs(
      this.currentPage,
      state.pageSize,
      action.payload.searchQuery,
      ctx,
    );
  }

  @Action(DocumentParagraphsDeleteDocumentParagraph)
  async deleteDocumentParagraph(
    ctx: StateContext<DocumentParagraphsStateModel>,
    action: DocumentParagraphsDeleteDocumentParagraph,
  ) {
    this.documentService
      .deleteDocumentParagraph(action.payload.documentParagraph.id)
      .subscribe({
        next: () => {
          const state = ctx.getState();

          this.getDocumentParagraphs(
            this.currentPage,
            state.pageSize,
            state.searchQuery,
            ctx,
          );
        },
        error: (err: DeleteDocumentParagraphFailure) => {
          switch (err) {
            case 'DocumentParagraphNotFound':
              this.notificationService.error(
                'Error',
                'Document paragraph not found',
              );
              break;
            default:
              this.notificationService.error('Error', 'Unknown error occurred');
              break;
          }
        },
      });
  }

  private async getDocumentParagraphs(
    page: number,
    pageSize: number,
    searchQuery: string,
    ctx: StateContext<DocumentParagraphsStateModel>,
  ): Promise<void> {
    this.documentService
      .getDocumentParagraphs(this.documentId, {
        page,
        pageSize,
        searchQuery,
      })
      .subscribe((res) => {
        this.currentPage = page;

        ctx?.patchState({ documentParagraphs: res, searchQuery, pageSize });
      });
  }
}
