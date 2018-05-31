import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ModuleMySuffix } from './module-my-suffix.model';
import { ModuleMySuffixPopupService } from './module-my-suffix-popup.service';
import { ModuleMySuffixService } from './module-my-suffix.service';

@Component({
    selector: 'jhi-module-my-suffix-delete-dialog',
    templateUrl: './module-my-suffix-delete-dialog.component.html'
})
export class ModuleMySuffixDeleteDialogComponent {

    module: ModuleMySuffix;

    constructor(
        private moduleService: ModuleMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.moduleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'moduleListModification',
                content: 'Deleted an module'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-module-my-suffix-delete-popup',
    template: ''
})
export class ModuleMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modulePopupService: ModuleMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modulePopupService
                .open(ModuleMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
