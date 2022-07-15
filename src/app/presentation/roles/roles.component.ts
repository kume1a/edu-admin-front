import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RolesState } from './state/roles.state';
import { debounceTime, Observable } from 'rxjs';
import { DataPage } from '../../data/model/common/data-page.interface';
import { Navigate } from '@ngxs/router-plugin';
import { Role } from '../../data/model/role/role.interface';
import { ActionRoles } from './state/roles.actions';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
  ) {}

  @Select(RolesState.roles) roles$!: Observable<DataPage<Role>>;
  @Select(RolesState.pageSize) pageSize$!: Observable<number>;

  searchFormControl?: FormControl;

  ngOnInit(): void {
    this.store.dispatch(ActionRoles.initialLoadRequested());

    this.searchFormControl = this.fb.control(undefined);
    this.searchFormControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) =>
        this.store.dispatch(
          ActionRoles.searchQueryChanged({ searchQuery: value }),
        ),
      );
  }

  onCurrentPageChanged(page: number) {
    this.store.dispatch(ActionRoles.pageChanged({ page }));
  }

  onPageSizeChanged(pageSize: number) {
    this.store.dispatch(ActionRoles.pageSizeChanged({ pageSize }));
  }

  onUpdateRolePressed(role: Role) {
    this.store.dispatch(new Navigate(['/roles/new'], { roleId: role.id }));
  }
}
