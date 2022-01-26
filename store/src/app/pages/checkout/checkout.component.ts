import { Component, OnInit } from '@angular/core';
import { switchMap, tap, delay } from 'rxjs/operators';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { DataService } from 'src/app/shared/service/data.service';
import { NgForm } from '@angular/forms';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { ShoppingCarService } from 'src/app/shared/service/shopping-cart.service';
import { Product } from '../products/interfaces/product.interface';
import { Router } from '@angular/router';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  model = {
    name: "",
    store: "",
    shippingAddress: "",
    city: "",
  };
  isDelivery!: boolean;
  cart: Product [] = [];
  stores: Store [] = []
  constructor(
    private dataSvc: DataService, 
    private shoppingCartSvc: ShoppingCarService,
    private router: Router,
    private productSvc: ProductsService
    ) { this.checkIfCartIsEmpty(); }
//recivimos la data del carrito
  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickupOrDelivery(value: boolean): void {
     this.isDelivery = true;
  }
//recivimos el formulario
  onSubmit({value: formData}: NgForm ): void {
    console.log(formData);
    const data: Order = {
      ...formData,
      date: this.getCurrentDay(),
      isDelivery: this.isDelivery
    }
    this.dataSvc.saveOrder(data)
     .pipe(
       tap(res => console.log (res) ),
       switchMap(({ id: orderId} ) => {
        const details= this.prepareDetails();
        return this.dataSvc.saveDatailsOrder({details, orderId})
       }),
       //cuando se guarde el pedido se borra el carrito y se redirecciona a la vista de pedido exitoso
       tap(()=> this.router.navigate(['/checkout/thank-you-page'])),
       delay(2000),
       tap(()=> this.shoppingCartSvc.resetCart())
       )
      .subscribe()
  }

  private getStores(): void {
    this.dataSvc.getStores()
    .pipe(
      tap((stores:Store [])=> this.stores= stores))
    .subscribe(stores => this.stores = stores);
  }

  private getCurrentDay(): string {
  
    return new Date().toLocaleDateString();
  }
//creamos un array de detalles para enviarlo al servicio
  private prepareDetails (): Details[] {
    const details: Details [] = [];
    this.cart.forEach((product: Product) => {
      const {id:productId, name:productName, qty:quantity, stock} = product;
      const updateStock = (stock - quantity);
      
      this.productSvc.updateStock(productId, updateStock)
      .pipe(
        tap(()=>details.push({productId, productName, quantity}) )
      )
      .subscribe()
  })
  return details;
  }
 //recivimos toda la data para colocarla en el cart
  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$
    .pipe(
      tap((product: Product[])=> this.cart= product)
    )
    .subscribe();
  }
//si el carrito esta vacio redireccionamos a la vista de productos
  private checkIfCartIsEmpty():void {
    this.shoppingCartSvc.cartAction$
    .pipe(
      tap((products: Product[])=> {
        if (Array.isArray(products) && !products.length) {
          this.router.navigate(['/products']);
        }
      })
    )
    .subscribe();
     }
}

