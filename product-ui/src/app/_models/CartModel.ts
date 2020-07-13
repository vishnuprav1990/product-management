export class CartModel {
    _id: string;
    item: any;
    count: number;

    constructor(item: string, count: number) {
        this.item = item;
        this.count = count;
    }
}
