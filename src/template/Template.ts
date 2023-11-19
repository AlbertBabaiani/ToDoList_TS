import FullList from "../model/FullList"
import Item from "../model/ListItem"

import ClearCompleted from "../functions/ClearCompleted"

export interface TemplateInt{
    ul: HTMLUListElement,

    clear(): void,
    render(fullList: FullList): void
}

export default class Template implements TemplateInt{

    static instance: Template = new Template()

    private constructor(
        public ul = document.getElementById('ToDo-List') as HTMLUListElement
    ){}

    clear(): void {
        this.ul.innerHTML = ''
    }

    render(fullList: FullList): void {
        this.clear()

        const clearCompleted = ClearCompleted.instance


        const quantity = document.getElementById('items-quantity') as HTMLSpanElement
        quantity.textContent = fullList.list.filter( (item: Item) => item.checked !== true).length.toString()


        const delete_all = document.querySelector('.delete-all') as HTMLBRElement
        if(fullList.list.length){
            delete_all.style.display = 'block';
        }
        else{
            delete_all.style.display = 'none';
        }

        fullList.list.forEach( (item: Item) =>{

            const li = document.createElement('li') as HTMLLIElement
            li.className = 'task'
            
            const block1 = document.createElement('div') as HTMLDivElement
            const block2 = document.createElement('div') as HTMLDivElement

            // const clear_completed = document.querySelector('.clear-completed') as HTMLButtonElement

            block1.className = 'task-block'
            block2.className = 'task-block'
            
            const checkbox = document.createElement('input') as HTMLInputElement
            checkbox.type = 'checkbox'
            checkbox.id = item.id
            checkbox.checked = item.checked

            checkbox.addEventListener('click', () =>{
                item.checked = !item.checked
                fullList.save() 

                if(item.checked){
                    clearCompleted.show()
                }

                clearCompleted.some(fullList)

                this.render(fullList)
            })

            const label = document.createElement('label') as HTMLLabelElement

            label.htmlFor = item.id
            label.className = 'task-name'
            label.textContent = item.item

            label.addEventListener('click', ((e: Event) =>{
               e.preventDefault()
               label.classList.toggle('expanded') 
            }))


            function updateItemValue(item_input: HTMLInputElement, temp: Element[], idd: string):void{
                if(!item_input.value.length){
                    fullList.removeItem(idd)
                    Template.instance.render(fullList)
                    return
                }

                temp.forEach( el=>{
                    if(el.querySelector('input')?.id.toString() === idd){
                        (el.querySelector('label') as HTMLLabelElement ).style.display = 'block'
                        
                        el.querySelectorAll('.task-block')[0]?.querySelector('input[type="text"]')?.remove()
                        el.classList.remove('selected')

                        fullList.updateItem(idd, item_input.value)
                        Template.instance.render(fullList)
                    }
                })
            }
            
            label.addEventListener('dblclick', ()=>{
                const item_input = document.createElement('input') as HTMLInputElement
                item_input.type = 'text'
                item_input.value = item.item
                item_input.classList.add('update-task')
                item_input.textContent = item.item

                li.classList.add('selected')

                const template = Template.instance

                const temp = [...template.ul.children]

                temp.forEach( el=>{
                    if(el.querySelector('input')?.id.toString() === item.id){
                        (el.querySelector('label') as HTMLLabelElement ).style.display = 'none'
                        el.querySelectorAll('.task-block')[0].append(item_input)
                        item_input.focus()
                    }
                })

                item_input.addEventListener('blur', ()=>{
                        updateItemValue(item_input, temp, item.id)
                })

                item_input.addEventListener('keyup', function(e: KeyboardEvent):void{
                    if(e.key === 'Enter'){
                        updateItemValue(item_input, temp, item.id)
                    }
                })
            })


            block1.append(checkbox, label)



            const btn1 = document.createElement('button') as HTMLButtonElement
            const btn2 = document.createElement('button') as HTMLButtonElement

            const clipBoard = document.querySelector('.clipBoard') as HTMLDivElement

            btn1.type = 'button'
            btn2.type = 'button'

            btn1.title = 'Copy'
            btn2.title = 'Delete'

            btn1.innerHTML = '<i class="fa-regular fa-copy"></i>'
            btn2.innerHTML = '<i class="fa-solid fa-trash"></i>'


            btn1.addEventListener('click', ()=>{
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(item.item);
                }
                document.execCommand(item.item);

                clipBoard.classList.add('active-clipBoard');
        
                setTimeout(function(){
                    clipBoard.classList.remove('active-clipBoard')
                }, 1200)
            })

            


            btn2.addEventListener('click', () =>{

                if(window.confirm(`Do you want to delete this task?`)){
                    fullList.removeItem(item.id)

                    li.classList.add('deleted-task')
                    
                    setTimeout(function():void{
                        li.classList.remove('deleted-task')
                        Template.instance.render(fullList)
                    }, 500)
                }

            })

            block2.append(btn1, btn2)

            li.append(block1, block2)

            this.ul.append(li)





            

            clearCompleted.some(fullList)

            // if(fullList.list.some ((item: Item) =>{
            //     return item.checked
            // })){
            //     clear_completed.classList.add('shown-button')
            // }
            // else{
            //     clear_completed.classList.remove('shown-button')
            // }

        })
    }
}