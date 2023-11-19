export interface Body{
    body: HTMLDivElement
    header(): string,
    main(): string,
    render(): void
}

export default class DisplayBody implements Body{

    static instance: DisplayBody = new DisplayBody()

    private constructor(
        private _body = document.getElementById('container') as HTMLDivElement
    ){}

    get body(): HTMLDivElement{
        return this._body
    }

    header(): string {
        const header: string = `
            <div class="custom-container-header">
                <h1 class="title">ToDo List</h1>
            </div>
            
            <div class="author">
                Created by 
                <a href="https://github.com/AlbertBabaiani" target="_blank"><i class="fa-brands fa-github"></i> Albert Babayan</a>
            </div>

            <div class="info-tools">
                <p>You have <span id="items-quantity">0</span> items</p>

                <button type="button" class="clear-completed">
                    Clear completed
                </button>
            </div>
        `

        return header
    }

    main(): string {
        const main: string = `
            <section class="input">

            <form name="form">
                <div>
                    <input type="text" name="new_task" id="new_task">
                    <label for="new_task">Add a task</label>
                    <button type='reset' id="reset">Clear</button>
                </div>

                <button type="button" id="btn_add">Add</button>
            </form>

        </section>



        <section class="todos">
            <ul id="ToDo-List" class="tasks">
            </ul>
            <button type='button' class='delete-all'>Delete all</button>
        </section>
        `

        return main
    }

    render(): void {
        // DisplayBody.instance.body.innerHTML = `${this.header, this.main}`
    }
}