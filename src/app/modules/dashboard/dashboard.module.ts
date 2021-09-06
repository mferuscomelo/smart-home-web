import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { GetLastItemPipe } from 'src/app/shared/pipes/get-last-item.pipe';

@NgModule({
  declarations: [DashboardComponent, GetLastItemPipe],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class DashboardModule {}
