export class ActionRoles {
  static initialLoadRequested() {
    return new RolesInitialLoadRequested();
  }

  static pageChanged(payload: { page: number }) {
    return new RolesPageChanged(payload);
  }

  static pageSizeChanged(payload: { pageSize: number }) {
    return new RolesPageSizeChanged(payload);
  }

  static searchQueryChanged(payload: { searchQuery: string }) {
    return new RolesSearchQueryChanged(payload);
  }
}

export class RolesInitialLoadRequested {
  static readonly type = '[roles] initial load requested';
}

export class RolesPageSizeChanged {
  static readonly type = '[roles] page size changed';

  constructor(public readonly payload: { pageSize: number }) {}
}

export class RolesPageChanged {
  static readonly type = '[roles] page changed';

  constructor(public readonly payload: { page: number }) {}
}

export class RolesSearchQueryChanged {
  static readonly type = '[roles] search query changed';

  constructor(public readonly payload: { searchQuery: string }) {}
}
