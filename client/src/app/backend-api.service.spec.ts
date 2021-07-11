import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BackendApiService } from './backend-api.service';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('BackendApiService', () => {
    let service: BackendApiService;
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule, StoreModule.forRoot({})],
            providers: [BackendApiService, Store]
        }).compileComponents();
        
        store = TestBed.inject(Store);
        service = TestBed.inject(BackendApiService);
    });

    it('should be created', () => {
        const service: BackendApiService = TestBed.inject(BackendApiService);
        expect(service).toBeTruthy();
    });
});
