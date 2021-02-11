import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ResolveEnd, Router } from '@angular/router';
import { delay, distinctUntilChanged } from 'rxjs/operators';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
	'./dashboard.component.less'],
	encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;
	loader = this.loaderService.loading.pipe(distinctUntilChanged(), delay(1));

  constructor(
		private loaderService: LoaderService,
		private router: Router,
	) { }

  ngOnInit(): void {
	
  }

}
