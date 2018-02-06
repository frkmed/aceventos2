import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';

import { CoreService } from './core/core.service';
import { DbConnectService } from './core/db-connect/db-connect.service';
import { SettingService } from './core/setting.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
