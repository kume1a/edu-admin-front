export class ActionDocuments {
  static init() {
    return new DocumentsInit();
  }
}

export class DocumentsInit {
  static readonly type = '[documents] initial load requested';
}
