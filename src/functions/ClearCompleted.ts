import FullList from "../model/FullList"
import Item from "../model/ListItem"

export interface ClearCompletedInt{
    btn: HTMLButtonElement,
    some(fullList: FullList):void,
    show():void,
    hide():void,
    count(fullList: FullList): number
}

export default class ClearCompleted implements ClearCompletedInt{
    
    static instance: ClearCompleted = new ClearCompleted()

    private constructor(
        public btn:HTMLButtonElement = document.querySelector('.clear-completed') as HTMLButtonElement
    ){}


    some(fullList: FullList): void {
        if(fullList.list.some ((item: Item) =>{
            return item.checked
        })){
            this.btn.classList.add('shown-button')
        }
        else{
            this.btn.classList.remove('shown-button')
        }
    }

    show(): void {
        this.btn.classList.add('shown-button')
    }

    hide(): void {
        this.btn.classList.remove('shown-button')
    }

    count(fullList: FullList): number {
        let temp: number = 0
        fullList.list.forEach( (item: Item) =>{
            if(item.checked) {
                temp++
            }
        })

        return temp
    }
}



// const clear_completed = document.querySelector('.clear-completed') as HTMLButtonElement
//     clear_completed.addEventListener('click', function():void{
//         let temp: number = 0
//         fullList.list.forEach( (item: Item) =>{
//             if(item.checked) {
//                 temp++
//             }
//         })
//         if(window.confirm(`Do you want to delete ${temp === 1 ? 'this item' : 'these items (' + temp.toString() + ')'}?`)){
//             fullList.list.forEach( (item: Item) =>{
//                 if(item.checked) {
//                     fullList.removeItem(item.id)
//                     template.render(fullList)
//                 }
//             })
//         }
//     })


       