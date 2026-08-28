import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { TransactionDto } from "../../models/transaction.model";
import { UpdateTransactionRequest } from "../../models/transaction.model";
import { form, FormField } from "@angular/forms/signals";
import { Category } from "../../../categories/models/category.model";
import { TransactionService } from "../../services/transaction.service";
import { CategoryService } from "../../../categories/services/categories-service";
import { AccountsService } from "../../../accounts/services/accounts-service";
import { Account } from "../../../accounts/models/account.model";

export interface UpdateTransactionFormModel {
    AccountId:string
    Amount:number
    Type:string
    Concept:string
    CategoryId:string
    ExecutionDate:Date
    BudgetId:number|null
}

@Component({
    selector: 'update-transaction-view',
    templateUrl: './update-transaction-view.html',
    imports: [FormField]
})
export class UpdateTransactionView {
    private transactionService = inject(TransactionService)
    private categoryService = inject(CategoryService)
    private accountService = inject(AccountsService)
    private router = inject(Router)

    private updateModel = signal<UpdateTransactionFormModel>({
        AccountId: '',
        Amount: 0,
        BudgetId: null,
        CategoryId: '',
        Concept: '',
        ExecutionDate: new Date(Date.now()),
        Type: 'expense'
    })
    categories = signal<Category[]>([])
    accounts = signal<Account[]>([])
    trId = signal(0)

    updateTransactionForm = form(this.updateModel)

    private route = inject(ActivatedRoute);
    private data = toSignal(this.route.data);
    //transaction = computed(() => this.data().transaction as TransactionDto

    ngOnInit(){
        this.categoryService.getAll()
            .subscribe({
                next: ok => this.categories.set(ok.Categories),
                error: err => console.log('error', err)
            })
        
        this.accountService.getAll()
            .subscribe({
                next: ok => this.accounts.set(ok),
                error: err => console.log('error', err)
            })
        
        this.route.paramMap.subscribe({
            next: value => {
                this.trId.set(parseInt(value.get("id")!))
                this.transactionService.getTransactionById(this.trId())
                .subscribe({
                    next: okResult => {
                        this.updateModel.set({
                            AccountId: okResult.Transaction.AccountId.toString(),
                            Amount: okResult.Transaction.Amount,
                            BudgetId: okResult.Transaction.BudgetId,
                            CategoryId: okResult.Transaction.CategoryId.toString(),
                            Concept: okResult.Transaction.Concept,
                            ExecutionDate: new Date(okResult.Transaction.ExecutionDate),
                            Type: okResult.Transaction.Type
                        })
                    },
                    error: error => console.log('error', error)
                })
            },
            error: error => console.log('error', error)
            })

    }

    newCategory(){
        this.router.navigate(['/create-category'])
    }

    onSubmit(event: Event) {
        event.preventDefault()
        this.transactionService.updateTransaction(this.trId(), {
            AccountId: parseInt(this.updateModel().AccountId),
            Amount: this.updateModel().Amount,
            BudgetId: this.updateModel().BudgetId,
            CategoryId: parseInt(this.updateModel().CategoryId),
            Concept: this.updateModel().Concept,
            ExecutionDate: this.updateModel().ExecutionDate,
            Type: this.updateModel().Type,
        }).subscribe({
            next: (resultOk) => this.router.navigate(['transactions']),
            error: (error) => console.log(error)
        })
    }
}