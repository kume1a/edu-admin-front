import {
  Action,
  Selector,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Navigate } from '@ngxs/router-plugin';
import { Document } from '../../../data/model/document/document.interface';
import {
  CreateDocumentParagraphFailure,
  DocumentService,
  GetDocumentFailure,
  GetDocumentParagraphFailure,
  UpdateDocumentParagraphFailure,
} from '../../../data/services/document.service';
import { DocumentParagraph } from '../../../data/model/document/document-paragraph.interface';
import {
  NewDocumentParagraphInit,
  NewDocumentParagraphSave,
} from './new-document-paragraph.actions';

interface NewDocumentParagraphStateModel {
  documentParagraph?: DocumentParagraph;
  document?: Document;
}

const NEW_DOCUMENT_PARAGRAPH_STATE_TOKEN =
  new StateToken<NewDocumentParagraphStateModel>('new_document_paragraph');

@State({
  name: NEW_DOCUMENT_PARAGRAPH_STATE_TOKEN,
  defaults: {},
})
@Injectable()
export class NewDocumentParagraphState {
  constructor(
    private readonly documentService: DocumentService,
    private readonly notificationService: NzNotificationService,
    private readonly store: Store,
  ) {}

  private args?: { documentId: number; documentParagraphId?: number };

  @Selector([NEW_DOCUMENT_PARAGRAPH_STATE_TOKEN])
  static document(state: NewDocumentParagraphStateModel): Document | undefined {
    return state.document;
  }

  @Selector([NEW_DOCUMENT_PARAGRAPH_STATE_TOKEN])
  static documentParagraph(
    state: NewDocumentParagraphStateModel,
  ): DocumentParagraph | undefined {
    return state.documentParagraph;
  }

  @Action(NewDocumentParagraphSave)
  async createRole(
    ctx: StateContext<NewDocumentParagraphStateModel>,
    action: NewDocumentParagraphSave,
  ) {
    if (!this.args) {
      return;
    }

    const documentParagraph = ctx.getState().documentParagraph;

    if (documentParagraph) {
      this.documentService
        .updateDocumentParagraph(documentParagraph.id, {
          title: action.payload.title,
          content: action.payload.content,
          index: action.payload.index,
        })
        .subscribe({
          next: () => this.redirectToDocumentParagraphs(),
          error: (err: UpdateDocumentParagraphFailure) => {
            switch (err) {
              case 'DocumentParagraphNotFound':
                this.notificationService.error(
                  'Error',
                  'Document paragraph not found',
                );
                break;
              default:
                this.notificationService.error(
                  'Error',
                  'Unknown error occurred',
                );
                break;
            }
          },
        });
    } else {
      this.documentService
        .createDocumentParagraph(this.args.documentId, {
          title: action.payload.title,
          content: action.payload.content,
          index: action.payload.index,
        })
        .subscribe({
          next: () => this.redirectToDocumentParagraphs(),
          error: (err: CreateDocumentParagraphFailure) => {
            switch (err) {
              case 'DocumentNotFound':
                this.notificationService.error('Error', 'Document not found');
                break;
              default:
                this.notificationService.error(
                  'Error',
                  'Unknown error occurred',
                );
                break;
            }
          },
        });
    }
  }

  @Action(NewDocumentParagraphInit)
  async init(
    ctx: StateContext<NewDocumentParagraphStateModel>,
    action: NewDocumentParagraphInit,
  ) {
    this.args = action.payload;
    ctx.patchState({ documentParagraph: undefined, document: undefined });

    if (action.payload.documentId) {
      this.documentService.getDocument(action.payload.documentId).subscribe({
        next: (res) => ctx.patchState({ document: res }),
        error: (err: GetDocumentFailure) => {
          switch (err) {
            case 'DocumentNotFound':
              this.notificationService.error('Error', 'Document not found');
              break;
            default:
              break;
          }
        },
      });
    }

    if (action.payload.documentParagraphId) {
      this.documentService
        .getDocumentParagraph(action.payload.documentParagraphId)
        .subscribe({
          next: (res) => ctx.patchState({ documentParagraph: res }),
          error: (err: GetDocumentParagraphFailure) => {
            switch (err) {
              case 'DocumentParagraphNotFound':
                this.notificationService.error(
                  'Error',
                  'Document paragraph not found',
                );
                break;
              default:
                this.notificationService.error(
                  'Error',
                  'Unknown error occurred',
                );
                break;
            }
          },
        });
    }
  }

  private redirectToDocumentParagraphs(): void {
    this.store.dispatch(
      new Navigate([`/documents/${this.args?.documentId}/paragraphs`]),
    );
  }
}
