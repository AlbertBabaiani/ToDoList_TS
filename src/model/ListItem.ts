export interface ListItem{
    id: string,
    item: string,
    checked: boolean
}

export default class Item implements ListItem{
    constructor(
        public id: string = '',
        public item: string = '',
        public checked: boolean = false,
    ){}


    // get id(): string{
    //     return this._id
    // }

    // set id(id: string){
    //     this._id = id;
    // }


    // get item(): string{
    //     return this._item
    // }

    // set item(item: string){
    //     this._item = item
    // }


    // get checked():boolean{
    //     return this._checked
    // }

    // set checked(checked: boolean){
    //     this._checked = checked
    // }
}