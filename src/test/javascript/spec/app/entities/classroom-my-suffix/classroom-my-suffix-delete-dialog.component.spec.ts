/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { ClassroomMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/classroom-my-suffix/classroom-my-suffix-delete-dialog.component';
import { ClassroomMySuffixService } from '../../../../../../main/webapp/app/entities/classroom-my-suffix/classroom-my-suffix.service';

describe('Component Tests', () => {

    describe('ClassroomMySuffix Management Delete Component', () => {
        let comp: ClassroomMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ClassroomMySuffixDeleteDialogComponent>;
        let service: ClassroomMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [ClassroomMySuffixDeleteDialogComponent],
                providers: [
                    ClassroomMySuffixService
                ]
            })
            .overrideTemplate(ClassroomMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClassroomMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassroomMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
