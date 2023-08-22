import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  beforeEach(waitForAsync(() => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: '' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct message', () => {
    const testMessage = 'Test Message';
    component.mensagem = testMessage;
    fixture.detectChanges();
    const dialogContent = fixture.nativeElement.querySelector('mat-dialog-content');
    expect(dialogContent.textContent).toContain(testMessage);
  });

  it('should close with true on confirmExclusion()', () => {
    component.confirmarExclusao();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should close with false on cancelExclusion()', () => {
    component.cancelarExclusao();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should call confirmarExclusao() on Confirm button click', () => {
    const confirmButton = fixture.debugElement.query(By.css('.btn-danger')).nativeElement;
    const confirmSpy = spyOn(component, 'confirmarExclusao');
    confirmButton.click();
    expect(confirmSpy).toHaveBeenCalled();
  });

  it('should call cancelarExclusao() on Cancel button click', () => {
    const cancelButton = fixture.debugElement.query(By.css('.btn-secondary')).nativeElement;
    const cancelSpy = spyOn(component, 'cancelarExclusao');
    cancelButton.click();
    expect(cancelSpy).toHaveBeenCalled();
  });
});


