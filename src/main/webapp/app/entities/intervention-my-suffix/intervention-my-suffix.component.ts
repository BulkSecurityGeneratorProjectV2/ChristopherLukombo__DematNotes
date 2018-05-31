import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InterventionMySuffix } from './intervention-my-suffix.model';
import { InterventionMySuffixService } from './intervention-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-intervention-my-suffix',
    templateUrl: './intervention-my-suffix.component.html'
})
export class InterventionMySuffixComponent implements OnInit, OnDestroy {
interventions: InterventionMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private interventionService: InterventionMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.interventionService.query().subscribe(
            (res: HttpResponse<InterventionMySuffix[]>) => {
                this.interventions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInterventions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: InterventionMySuffix) {
        return item.id;
    }
    registerChangeInInterventions() {
        this.eventSubscriber = this.eventManager.subscribe('interventionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
