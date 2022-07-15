import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActionDashboard } from './state/dashboard.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ActionDashboard.initialLoadRequested());
  }
}
