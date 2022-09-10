import { Component, OnInit } from '@angular/core';
import {TRAVEL_AGENCY_NAME} from "../../models/config";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  agencyName!: string

  constructor() {
    this.agencyName = TRAVEL_AGENCY_NAME
  }

  ngOnInit(): void {
  }

}
