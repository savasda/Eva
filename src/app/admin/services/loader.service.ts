import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, switchMap, delay } from 'rxjs/operators';
import { AdminServicesModule } from './services.module';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loading = new BehaviorSubject(false);
}
