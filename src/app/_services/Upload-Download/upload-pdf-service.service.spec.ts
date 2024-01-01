import { TestBed } from '@angular/core/testing';

import { UploadPdfServiceService } from './upload-pdf-service.service';

describe('UploadPdfServiceService', () => {
  let service: UploadPdfServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadPdfServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
