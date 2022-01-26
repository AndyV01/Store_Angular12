import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  @Input() product!: Product
  //evento para agregar al carrito de compras
  @Output() addToCartClick = new EventEmitter<Product>();
  constructor() { }
  
  ngOnInit(): void {
  }

  onClick(): void {
  
    this.addToCartClick.emit(this.product)
}
}
