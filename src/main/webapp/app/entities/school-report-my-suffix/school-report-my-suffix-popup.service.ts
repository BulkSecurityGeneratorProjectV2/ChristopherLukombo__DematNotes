import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SchoolReportMySuffix } from './school-report-my-suffix.model';
import { SchoolReportMySuffixService } from './school-report-my-suffix.service';

@Injectable()
export class SchoolReportMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private schoolReportService: SchoolReportMySuffixService

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
                this.schoolReportService.find(id)
                    .subscribe((schoolReportResponse: HttpResponse<SchoolReportMySuffix>) => {
                        const schoolReport: SchoolReportMySuffix = schoolReportResponse.body;
                        if (schoolReport.creationDate) {
                            schoolReport.creationDate = {
                                year: schoolReport.creationDate.getFullYear(),
                                month: schoolReport.creationDate.getMonth() + 1,
                                day: schoolReport.creationDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.schoolReportModalRef(component, schoolReport);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.schoolReportModalRef(component, new SchoolReportMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    schoolReportModalRef(component: Component, schoolReport: SchoolReportMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.schoolReport = schoolReport;
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
