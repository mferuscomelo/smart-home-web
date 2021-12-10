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
import { TemperatureComponent } from './components/temperature/temperature.component';
import { AirQualityComponent } from './components/air-quality/air-quality.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { WeatherComponent } from './components/weather/weather.component';
import { PowerComponent } from './components/power/power.component';

@NgModule({
  declarations: [DashboardComponent, GetLastItemPipe, ReversePipe, FavoriteDevicesComponent, TemperatureComponent, AirQualityComponent, NotificationsComponent, WeatherComponent, PowerComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class DashboardModule {}
