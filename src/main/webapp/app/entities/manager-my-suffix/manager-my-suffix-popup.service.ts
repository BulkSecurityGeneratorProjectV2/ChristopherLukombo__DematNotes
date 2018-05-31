import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ManagerMySuffix } from './manager-my-suffix.model';
import { ManagerMySuffixService } from './manager-my-suffix.service';

@Injectable()
export class ManagerMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private managerService: ManagerMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.managerService.find(id)
                    .subscribe((managerResponse: HttpResponse<ManagerMySuffix>) => {
                        const manager: ManagerMySuffix = managerResponse.body;
                        if (manager.dateOfBirth) {
                            manager.dateOfBirth = {
                                year: manager.dateOfBirth.getFullYear(),
                                month: manager.dateOfBirth.getMonth() + 1,
                                day: manager.dateOfBirth.getDate()
                            };
                        }
                        this.ngbModalRef = this.managerModalRef(component, manager);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.managerModalRef(component, new ManagerMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    managerModalRef(component: Component, manager: ManagerMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.manager = manager;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
