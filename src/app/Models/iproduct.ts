export interface IProduct {
  id:number;
  name:string;
  arabicName:string;
  price:number;
  unitInStock:number;
  description:string;
  arabicDescription:string;
  categoryId:number;
  images:string[];
  Qty:number;
  rate?:number;
}
