import { Component, Input } from '@angular/core';
import { DocumentParagraph } from '../../../data/model/document/document-paragraph.interface';

@Component({
  selector: 'app-document-paragraph-content',
  templateUrl: './document-paragraph-content.component.html',
  styleUrls: ['./document-paragraph-content.component.scss'],
})
export class DocumentParagraphContentComponent {
  @Input() documentParagraph!: DocumentParagraph;
}
