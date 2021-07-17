import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent as observableFromEvent, Observable, Subscription, Subject } from 'rxjs';
import { share, filter } from 'rxjs/operators';

/**
 * Provides a service
 */
@Injectable({ providedIn: 'root' })
export class StorageEventService implements OnDestroy {

  private readonly eventStream: Subject<StorageEvent> = new Subject<StorageEvent>();
  private readonly subscriptions = new Subscription();

  /**
   * Create e new instance.
   */
  constructor() {
    this.subscriptions.add(
      observableFromEvent<StorageEvent>(window, 'storage')
        .subscribe((ev: StorageEvent) => this.eventStream.next(ev))
    );
  }

  /**
   * Gets a stream of storage events.
   */
  public get stream(): Observable<StorageEvent> {
    return this.eventStream
      .asObservable().pipe(
        filter(ev => !!ev),
        share()
      );
  }

  /**
   * OnDestroy lifecycle hook. Clears the subscription.
   */
  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
