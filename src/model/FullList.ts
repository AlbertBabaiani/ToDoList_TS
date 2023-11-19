import Item from "./ListItem"
import ClearCompleted from "../functions/ClearCompleted";

export interface FullListInt{
    list: Item[],

    load(): void,
    save(): void,
    clearList(): void,
    addItem(toDo: Item): void,
    removeItem(id: string): void,
    updateItem(id: string, newWord: string): void
}

export default class FullList implements FullListInt{
    
    static instance: FullList = new FullList()
    
    private constructor(
        private _list: Item[] = []
    ){}

    get list(){
        return this._list;
    }

    load(): void {
        const localSaved: string | null = localStorage.getItem('list_TS');
        if(typeof localSaved !== 'string') return

        const parsedJSON: Item[] = JSON.parse(localSaved)

        parsedJSON.forEach( (toDo: Item) => {
            const todo = new Item(toDo.id, toDo.item, toDo.checked)

            FullList.instance.addItem(todo)
        });
    }

    save(): void {
        localStorage.setItem('list_TS', JSON.stringify(this._list))
    }

    clearList(): void {
        this._list = []
        this.save()

        const clearCompleted = ClearCompleted.instance
        clearCompleted.hide()
        // clear_completed.classList.remove('shown-button')
    }

    addItem(toDo: Item): void {
        this._list.push(toDo)
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter( (el: Item) => el.id !== id )
        this.save()
    }

    updateItem(id: string, newWord: string): void {
        this._list.forEach ((item: Item) =>{
            if(item.id === id){
                item.item = newWord
                this.save()
            }
        })
    }
}