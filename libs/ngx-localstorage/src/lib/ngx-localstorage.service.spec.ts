import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { NgxLocalstorageService } from './ngx-localstorage.service';

describe('NgxLocalstorageService', () => {
  let spectator: SpectatorService<NgxLocalstorageService>;
  const createService = createServiceFactory(NgxLocalstorageService);

  beforeEach(() => spectator = createService());

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});