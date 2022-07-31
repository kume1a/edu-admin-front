export class ActionNewDocumentParagraph {
  static init(payload: { documentId: number; documentParagraphId?: number }) {
    return new NewDocumentParagraphInit(payload);
  }

  static save(payload: NewDocumentParagraphSavePayload) {
    return new NewDocumentParagraphSave(payload);
  }
}

interface NewDocumentParagraphSavePayload {
  title: string;
  index: number;
  content: string;
}
export class NewDocumentParagraphSave {
  static readonly type = '[new-document-paragraph] save';

  constructor(public payload: NewDocumentParagraphSavePayload) {}
}

export class NewDocumentParagraphInit {
  static readonly type = '[new-document-paragraph] init';

  constructor(
    public readonly payload: {
      documentId: number;
      documentParagraphId?: number;
    },
  ) {}
}
