import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DocumentService } from '../../../data/services/document.service';
import { DocumentsInit } from './documents.actions';
import { Document } from '../../../data/model/document/document.interface';

interface DocumentsStateModel {
  documents: Document[];
}

const DOCUMENTS_STATE_TOKEN = new StateToken<DocumentsStateModel>('documents');

@State<DocumentsStateModel>({
  name: DOCUMENTS_STATE_TOKEN,
  defaults: {
    documents: [],
  },
})
@Injectable()
export class DocumentsState {
  constructor(private readonly documentService: DocumentService) {}

  @Selector([DOCUMENTS_STATE_TOKEN])
  static documents(state: DocumentsStateModel) {
    return state.documents;
  }

  @Action(DocumentsInit)
  async init(ctx: StateContext<DocumentsStateModel>) {
    this.documentService
      .getDocuments()
      .subscribe((res) => ctx?.patchState({ documents: res }));
  }
}
