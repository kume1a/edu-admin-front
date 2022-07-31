export class ActionDocumentParagraphs {
  static init(payload: { documentId: number }) {
    return new DocumentParagraphsInit(payload);
  }

  static pageChanged(payload: { page: number }) {
    return new DocumentParagraphsPageChanged(payload);
  }

  static pageSizeChanged(payload: { pageSize: number }) {
    return new DocumentParagraphsPageSizeChanged(payload);
  }

  static searchQueryChanged(payload: { searchQuery: string }) {
    return new DocumentParagraphsSearchQueryChanged(payload);
  }
}

export class DocumentParagraphsInit {
  static readonly type = '[document-paragraphs] init';

  constructor(public readonly payload: { documentId: number }) {}
}

export class DocumentParagraphsPageSizeChanged {
  static readonly type = '[document-paragraphs] page size changed';

  constructor(public readonly payload: { pageSize: number }) {}
}

export class DocumentParagraphsPageChanged {
  static readonly type = '[document-paragraphs] page changed';

  constructor(public readonly payload: { page: number }) {}
}

export class DocumentParagraphsSearchQueryChanged {
  static readonly type = '[document-paragraphs] search query changed';

  constructor(public readonly payload: { searchQuery: string }) {}
}
