import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.less'],
	encapsulation: ViewEncapsulation.None
})
export class StylesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
