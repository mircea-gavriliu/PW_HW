import { Component, OnInit } from '@angular/core';
import { Assets } from '../assets';
import {  faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logoLink: string = Assets.LOGO_LINK;
  faShoppingCart=faShoppingCart
  faSearch=faSearch

  constructor() { }

  ngOnInit(): void {
  }

}
