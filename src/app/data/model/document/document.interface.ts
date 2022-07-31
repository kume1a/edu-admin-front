import { DocumentParagraph } from './document-paragraph.interface';

export interface Document {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  paragraphs: DocumentParagraph[];
}
