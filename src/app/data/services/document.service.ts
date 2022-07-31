import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Document } from '../model/document/document.interface';
import { DataPage } from '../model/common/data-page.interface';
import { DocumentParagraph } from '../model/document/document-paragraph.interface';
import { HttpErrorResponse } from '@angular/common/http';

export type DeleteDocumentParagraphFailure = 'DocumentParagraphNotFound';
export type UpdateDocumentParagraphFailure = 'DocumentParagraphNotFound';
export type GetDocumentParagraphFailure = 'DocumentParagraphNotFound';
export type CreateDocumentParagraphFailure = 'DocumentNotFound';
export type GetDocumentFailure = 'DocumentNotFound';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  constructor(private readonly apiService: ApiService) {}

  getDocuments(): Observable<Document[]> {
    return this.apiService.getDocuments();
  }

  getDocumentParagraphs(
    documentId: number,
    params: {
      page: number;
      pageSize: number;
      searchQuery?: string;
    },
  ): Observable<DataPage<DocumentParagraph>> {
    return this.apiService.getDocumentParagraphs(documentId, {
      ...params,
      searchQuery: params.searchQuery ? params.searchQuery : undefined,
    });
  }

  createDocumentParagraph(
    documentId: number,
    params: {
      title: string;
      content: string;
      index: number;
    },
  ): Observable<DocumentParagraph> {
    return this.apiService
      .createDocumentParagraph(documentId, params)
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(err?.error?.message)),
      );
  }

  getDocumentParagraph(
    documentParagraphId: number,
  ): Observable<DocumentParagraph> {
    return this.apiService
      .getDocumentParagraphById(documentParagraphId)
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(err?.error?.message)),
      );
  }

  updateDocumentParagraph(
    documentParagraphId: number,
    params: {
      title?: string;
      content?: string;
      index?: number;
    },
  ): Observable<DocumentParagraph> {
    return this.apiService
      .updateDocumentParagraphById(documentParagraphId, params)
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(err?.error?.message)),
      );
  }

  deleteDocumentParagraph(documentParagraphId: number): Observable<void> {
    return this.apiService
      .deleteDocumentParagraphById(documentParagraphId)
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(err?.error?.message)),
      );
  }

  getDocument(documentId: number): Observable<Document> {
    return this.apiService
      .getDocument(documentId)
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(err?.error?.message)),
      );
  }
}
