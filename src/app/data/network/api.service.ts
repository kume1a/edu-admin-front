import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SignInBody } from '../model/authentication/sign-in.body';
import { DataPage } from '../model/common/data-page.interface';
import { Role } from '../model/role/role.interface';
import { CreateRoleBody } from '../model/role/create-role.body';
import { UpdateRoleBody } from '../model/role/update-role.body';
import { Permission } from '../model/role/permission.interface';
import { Constants } from '../../common/constants';
import { AuthenticationPayload } from '../model/authentication/authentication-payload';
import { FilterRolesQuery } from '../model/role/filter-roles.query';
import { Document } from '../model/document/document.interface';
import { DocumentParagraph } from '../model/document/document-paragraph.interface';
import { PageOptions } from '../model/common/page-options.interface';
import { UpdateDocumentParagraphBody } from '../model/document/update-document-paragraph.body';
import { CreateDocumentParagraphBody } from '../model/document/create-document-paragraph.body';

const API_URL = Constants.API_URL;

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private readonly client: HttpClient) {}

  signIn(body: SignInBody): Observable<AuthenticationPayload> {
    return this.client.post<AuthenticationPayload>(
      `${API_URL}/Authentication/SignIn`,
      body,
    );
  }

  signOut(): Observable<void> {
    return this.client.post<void>(
      `${API_URL}/Authentication/SignOut`,
      undefined,
    );
  }

  refreshToken(body: {
    refreshToken: string;
  }): Observable<AuthenticationPayload> {
    return this.client.post<AuthenticationPayload>(
      `${API_URL}/Authentication/Refresh`,
      body,
    );
  }

  getRoles(query: FilterRolesQuery): Observable<DataPage<Role>> {
    let params = new HttpParams()
      .set('page', query.page)
      .set('pageSize', query.pageSize);

    if (query.searchQuery) {
      params = params.set('searchQuery', query.searchQuery);
    }

    return this.client.get<DataPage<Role>>(`${API_URL}/Role`, { params });
  }

  createRole(body: CreateRoleBody): Observable<Role> {
    return this.client.post<Role>(`${API_URL}/Role`, body);
  }

  updateRole(roleId: string, body: UpdateRoleBody): Observable<Role> {
    return this.client.patch<Role>(`${API_URL}/Role/${roleId}`, body);
  }

  getRole(roleId: string): Observable<Role> {
    return this.client.get<Role>(`${API_URL}/Role/${roleId}`);
  }

  getPermissions(): Observable<Permission[]> {
    return this.client.get<Permission[]>(`${API_URL}/Permission`);
  }

  getDocuments(): Observable<Document[]> {
    return this.client.get<Document[]>(`${API_URL}/Document`);
  }

  getDocumentParagraphs(
    documentId: number,
    query: {
      searchQuery?: string;
    } & PageOptions,
  ): Observable<DataPage<DocumentParagraph>> {
    let params = new HttpParams()
      .set('page', query.page)
      .set('pageSize', query.pageSize);

    if (query.searchQuery) {
      params = params.set('searchQuery', query.searchQuery);
    }

    return this.client.get<DataPage<DocumentParagraph>>(
      `${API_URL}/Document/${documentId}/Paragraphs`,
      { params },
    );
  }

  createDocumentParagraph(
    documentId: number,
    body: CreateDocumentParagraphBody,
  ): Observable<DocumentParagraph> {
    return this.client.post<DocumentParagraph>(
      `${API_URL}/Document/${documentId}/Paragraphs`,
      body,
    );
  }

  getDocumentParagraphById(
    documentParagraphId: number,
  ): Observable<DocumentParagraph> {
    return this.client.get<DocumentParagraph>(
      `${API_URL}/Document/Paragraphs/${documentParagraphId}`,
    );
  }

  updateDocumentParagraphById(
    documentParagraphId: number,
    body: UpdateDocumentParagraphBody,
  ): Observable<DocumentParagraph> {
    return this.client.patch<DocumentParagraph>(
      `${API_URL}/Document/Paragraphs/${documentParagraphId}`,
      body,
    );
  }

  deleteDocumentParagraphById(documentParagraphId: number): Observable<void> {
    return this.client.delete<void>(
      `${API_URL}/Document/Paragraphs/${documentParagraphId}`,
    );
  }

  getDocument(documentId: number): Observable<Document> {
    return this.client.get<Document>(`${API_URL}/Document/${documentId}`);
  }
}
