import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { DocumentsState } from './state/documents.state';
import { Document } from '../../data/model/document/document.interface';
import { ActionDocuments } from './state/documents.actions';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  constructor(private readonly store: Store) {}

  @Select(DocumentsState.documents) documents$!: Observable<Document[]>;

  ngOnInit(): void {
    this.store.dispatch(ActionDocuments.init());
  }

  onUpdateDocumentPressed(document: Document) {
    this.store.dispatch(new Navigate([`/documents/${document.id}/paragraphs`]));
  }
}
