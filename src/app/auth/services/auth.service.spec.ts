import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SharedModule } from '../../shared/shared.module';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { CardService } from 'src/app/budgetify/budgetify/card/services/card.service';
import { TransactionsService } from 'src/app/budgetify/budgetify/main/transactions/services/transactions.service';

describe('AuthService - testing', () => {
  let httpController: HttpTestingController;

  let service: AuthService;

  let cardServiceMock: jasmine.SpyObj<CardService>;
  let transactionsServiceMock: jasmine.SpyObj<TransactionsService>;

  beforeEach(() => {
     cardServiceMock = jasmine.createSpyObj(
      'CardService',
      {},
      { accountCards: [1,2,3] }
    );
     transactionsServiceMock = jasmine.createSpyObj(
      'TransactionsService',
      {},
      { transactionsCards: [1,2,3] }
    );
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
      providers: [
        AuthService,

        { provide: CardService, useValue: cardServiceMock },
        { provide: TransactionsService, useValue: transactionsServiceMock },
      ],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);

    cardServiceMock = TestBed.inject(CardService) as jasmine.SpyObj<CardService>;
    transactionsServiceMock = TestBed.inject(
      TransactionsService
    ) as jasmine.SpyObj<TransactionsService>;
  });

  it('AuthService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setSession have to call on success', (done: DoneFn) => {
    spyOn(service as any, 'setSession');
    const expectedResult = {
      id: 'id',
      email: 'email',
      role: 'role',
      token: 'token',
      expiresIn: 3600000,
      country: 'country',
    };
    service.login('email', 'psw').subscribe(() => {
      expect((service as any).setSession).toHaveBeenCalledOnceWith(
        expectedResult
      );
      done();
    });
    const req = httpController.expectOne({
      method: 'POST',
      url: `https://arcane-castle-89963.herokuapp.com/login`,
    });
    req.flush(expectedResult);
  });


  it('logout test',()=>{
    localStorage.setItem('idToken', '323h3h23gh23h23ik3');
    localStorage.setItem('expiresIn', '44848384348');
    service.logOut();
    expect(localStorage['expiresIn']).toBe(undefined);
    expect(localStorage['idToken']).toBe(undefined);
    
  })
});
