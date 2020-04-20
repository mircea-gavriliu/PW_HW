export class Product
{
    public Id; 
    public Name:string;
    public Description:string;
    public Quantity:number; 
    public Category:number; 

    constructor(Id,Name,Description,Quantity,Category){
        this.Id=Id;
        this.Name=Name;
        this.Description=Description;
        this.Quantity=Quantity;
        this.Category=Category;
    }
}