import { PageOptions } from '../common/page-options.interface';

export interface FilterRolesQuery extends PageOptions {
  searchQuery?: string;
}
