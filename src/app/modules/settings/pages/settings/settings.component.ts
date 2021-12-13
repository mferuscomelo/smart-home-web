import { Component, OnInit } from '@angular/core';
import { PwaService } from 'src/app/core/services/pwa.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(public pwaService: PwaService) {}

  ngOnInit(): void {}
}
