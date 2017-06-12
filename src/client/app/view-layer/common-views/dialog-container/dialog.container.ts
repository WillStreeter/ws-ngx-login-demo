import { Component,
         ViewChild,
         ViewContainerRef,
         ComponentRef,
         ComponentFactoryResolver,
         ReflectiveInjector } from '@angular/core';



@Component({
  moduleId: module.id,
  selector: 'dialog-container',
  templateUrl: 'dialog.container.html',
})


export class  DialogContainerComponent {
  @ViewChild('placeHolder', {read: ViewContainerRef}) private _placeHolder:any;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {
  }


  public loadComponent(aDialogComponent:any) {
    let cmp = this.createComponent(this._placeHolder, aDialogComponent);

    // all inputs/outputs set? add it to the DOM ..
    this._placeHolder.insert(cmp.hostView);

  }

  public createComponent (vCref: ViewContainerRef,  type:any): ComponentRef<any> {

    let factory = this._componentFactoryResolver.resolveComponentFactory(type);

    // vCref is needed cause of that injector..
    let injector = ReflectiveInjector.fromResolvedProviders([], vCref.parentInjector);

    // create component without adding it directly to the DOM
    let comp = factory.create(injector);

    return comp;
  }
}
