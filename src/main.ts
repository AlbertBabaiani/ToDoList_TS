import './styles/index.scss'

// import DisplayBody from './template/Display'

import Item from './model/ListItem'
import FullList from './model/FullList'
import Template from './template/Template'

import ClearCompleted from './functions/ClearCompleted'




function init(){
    const loader = document.querySelector('.loader')! as HTMLDivElement
    loader.style.display = 'none'

    // const body = DisplayBody.instance
    // body.render()
    
    const fullList = FullList.instance
    const template = Template.instance

    const form = document.querySelector('[name="form"]') as HTMLFormElement
    const input = form.querySelector('#new_task') as HTMLInputElement
    const reset = form.querySelector('#reset') as HTMLButtonElement
    const btn_add = form.querySelector('#btn_add') as HTMLButtonElement
    const label = form.querySelector('[for="new_task"]') as HTMLLabelElement

    // const clear_completed = document.querySelector('.clear-completed') as HTMLButtonElement
    // clear_completed.addEventListener('click', function():void{
    //     let temp: number = 0
    //     fullList.list.forEach( (item: Item) =>{
    //         if(item.checked) {
    //             temp++
    //         }
    //     })
    //     if(window.confirm(`Do you want to delete ${temp === 1 ? 'this item' : 'these items (' + temp.toString() + ')'}?`)){
    //         fullList.list.forEach( (item: Item) =>{
    //             if(item.checked) {
    //                 fullList.removeItem(item.id)
    //                 template.render(fullList)
    //             }
    //         })
    //     }
    // })

    const clearCompleted = ClearCompleted.instance
    clearCompleted.btn.addEventListener('click', function():void{
        let count = clearCompleted.count(fullList)

        if(window.confirm(`Do you want to delete ${count === 1 ? 'this item' : 'these items (' + count.toString() + ')'}?`)){

            const temp = [...template.ul.children]

            temp.forEach( el =>{
                if((el.querySelector('input') as HTMLInputElement).checked){
                    el.classList.add('deleted-task')
                    
                    setTimeout(function():void{
                        el.classList.remove('deleted-task')
                    }, 500)
                }
            })
            
            
            fullList.list.forEach( (item: Item) =>{
                if(item.checked) {
                    fullList.removeItem(item.id)
                }
            })
            setTimeout(() => {
                template.render(fullList)
            }, 500);
        }

        clearCompleted.some(fullList)
        clearCompleted.btn.blur()
        
    })


    const delete_all = document.querySelector('.delete-all') as HTMLButtonElement
    delete_all.addEventListener('click', function():void{
        if(window.confirm(`Do you want to delete all items?`)){
            const temp = [...template.ul.children]

            temp.forEach( el =>{
                el.classList.add('deleted-task')

                setTimeout(function():void{
                    el.classList.remove('deleted-task')
                    
                    fullList.clearList()
                    template.render(fullList)
                }, 500)
            })
        }
        delete_all.blur()
    })

    input.value = ''

    function inputLabel(){
        if(input.value.trim().length){
            input.classList.add('active-input')
            label.classList.add('active-label')
        }
        else{
            input.classList.remove('active-input')
            label.classList.remove('active-label')
        }
    }

    input.addEventListener('change', inputLabel)
    input.addEventListener('input', inputLabel)
    input.addEventListener('blur', inputLabel)

    reset.addEventListener('click', ()=>{
        input.focus()
        inputLabel()
    })


    function submitTask(): void{
        btn_add.blur()
        const input_value: string = input.value.trim()
        if(!input_value.length) return

        const toDoId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1



        const newItem = new Item(toDoId.toString(), input_value)

        fullList.addItem(newItem)

        template.render(fullList)
        input.value = ''
    }

    form.addEventListener('submit', (e: SubmitEvent)=>{
        e.preventDefault()

        submitTask()
    })

    btn_add.addEventListener('click', submitTask)



    fullList.load()
    template.render(fullList)
}




document.addEventListener('DOMContentLoaded', init)