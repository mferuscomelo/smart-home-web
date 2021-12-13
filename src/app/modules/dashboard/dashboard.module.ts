import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { GetLastItemPipe } from 'src/app/shared/pipes/get-last-item.pipe';
import { ReversePipe } from '../../shared/pipes/reverse.pipe';
import { FavoriteDevicesComponent } from './components/favorite-devices/favorite-devices.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { WeatherComponent } from './components/weather/weather.component';
import { SmallDataCardComponent } from './components/small-data-card/small-data-card.component';
import { ChartCardComponent } from './components/chart-card/chart-card.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DashboardComponent,
    GetLastItemPipe,
    ReversePipe,
    FavoriteDevicesComponent,
    NotificationsComponent,
    WeatherComponent,
    SmallDataCardComponent,
    ChartCardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    NgChartsModule,
  ],
})
export class DashboardModule {}
