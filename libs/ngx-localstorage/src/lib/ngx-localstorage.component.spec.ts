import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { NgxLocalstorageComponent } from './ngx-localstorage.component';

describe('NgxLocalstorageComponent', () => {
  let spectator: Spectator<NgxLocalstorageComponent>;
  const createComponent = createComponentFactory(NgxLocalstorageComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
