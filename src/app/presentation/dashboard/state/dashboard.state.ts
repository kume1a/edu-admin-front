import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DashboardInitialLoadRequested } from './dashboard.actions';

interface DashboardStateModel {}

const DASHBOARD_STATE_TOKEN = new StateToken<DashboardStateModel>('dashboard');

@State<DashboardStateModel>({
  name: DASHBOARD_STATE_TOKEN,
  defaults: {},
})
@Injectable()
export class DashboardState {
  @Action(DashboardInitialLoadRequested)
  async initialLoadRequested(ctx: StateContext<DashboardStateModel>) {}
}
