import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { BaseItem, BaseComponent } from '../base/base';
import { MessageService } from '../message.service';
import { Formula } from './formula/formula.component';
import { Contacts } from './contacts/contacts.component';
import { Chart } from './chart/chart.component';
import { History } from './history/history.component';
import { Grid } from './grid/grid.component';

@Component({
	selector: 'app-page',
	templateUrl: './page.component.html',
	styleUrls: ['./page.component.scss'],
	providers: [MessageService]
})
export class PageComponent implements OnInit {

	private formula: Formula;
	private contacts: Contacts;
	private technologies: Chart;
	private history: History;
	private portfolio: Grid;


	constructor(private messageService: MessageService) {

	}

	ngOnInit(): void {
		this.loadSections();
	}

	public loadSections(): void {
		this.messageService.processMessage('sections/formula.json')
		.subscribe(message => {
			this.formula = new Formula(message.json());
		});

		this.messageService.processMessage('sections/portfolio.json')
		.subscribe(message => {
			this.portfolio = new Grid(message.json());
		});

		this.messageService.processMessage('sections/journey.json')
		.subscribe(message => {
			this.history = new History(message.json());
		});

		this.messageService.processMessage('sections/technologies.json')
		.subscribe(message => {
			this.technologies = new Chart(message.json());
		});

		this.messageService.processMessage('sections/contacts.json')
		.subscribe(message => {
			this.contacts = new Contacts(message.json());
		});
	}
}