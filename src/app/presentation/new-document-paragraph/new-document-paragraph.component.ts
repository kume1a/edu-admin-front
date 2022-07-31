import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ActionNewDocumentParagraph } from './state/new-document-paragraph.actions';
import { ActivatedRoute } from '@angular/router';
import { NewDocumentParagraphState } from './state/new-document-paragraph.state';
import { map, Observable, zip } from 'rxjs';
import { FormHelper } from '../core/util/form.helper';
import { Document } from '../../data/model/document/document.interface';
import { DocumentParagraph } from '../../data/model/document/document-paragraph.interface';
import { patternInteger } from '../../common/patterns';

@Component({
  selector: 'app-document-paragraph',
  templateUrl: './new-document-paragraph.component.html',
  styleUrls: ['./new-document-paragraph.component.scss'],
})
export class NewDocumentParagraphComponent {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly formHelper: FormHelper,
  ) {}

  @Select(NewDocumentParagraphState.document)
  document$!: Observable<Document>;

  @Select(NewDocumentParagraphState.documentParagraph)
  documentParagraph$!: Observable<DocumentParagraph>;

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      index: [
        undefined,
        [Validators.required, Validators.pattern(patternInteger)],
      ],
      content: ['', Validators.required],
    });

    zip(this.route.params, this.route.queryParams)
      .pipe(map(([params, queryParams]) => ({ params, queryParams })))
      .subscribe(({ params, queryParams }) => {
        const documentId = params['documentId'];
        const documentParagraphId = queryParams['documentParagraphId'];

        this.store.dispatch(
          ActionNewDocumentParagraph.init({ documentParagraphId, documentId }),
        );
      });

    this.documentParagraph$.subscribe((documentParagraph) =>
      this.form.patchValue({
        title: documentParagraph?.title,
        index: documentParagraph?.index,
        content: documentParagraph?.content,
      }),
    );
  }

  onSavePressed() {
    if (this.form.invalid) {
      this.formHelper.markFormGroupDirty(this.form);
      return;
    }

    this.store.dispatch(ActionNewDocumentParagraph.save(this.form.value));
  }
}
