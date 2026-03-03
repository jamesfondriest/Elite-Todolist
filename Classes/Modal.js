class Modal{
    constructor(modalId){
        this.modal = document.getElementById(modalId);
        this.saveButton = this.modal.querySelector(".save-button");
        this.closeButton = this.modal.querySelector(".close-button"); //selects modal from index.html
    }
    open(){//modal appears
        if(this.modal.showModal){
            this.modal.showModal();
        }else{
            this.modal.style.display = "block";
    }
    close(){//modal disappears
        if(this.modal.close){
            this.modal.close();
        } else{
            this.modal.style.display = "none";
    }
        this.resetInput();
    }
    waitForInput(){
        return new Promise((resolve) => {//modal doesnt wait for user to input before continuing running rest of code, this makes the function pause to gather user input
            const handleSave = () => {
                clear();
                this.close();
                resolve(true);
            };
            const handleClose = () => {
                clear();
                this.close();
                resolve(false);
            };
            const clear = () => {
                this.saveButton.removeEventListener("click", handleSave)
                this.closeButton.removeEventListener("click", handleClose)
            };
            this.saveButton.addEventListener("click", handleSave)
            this.closeButton.addEventListener("click", handleClose)
        });
    }
    resetInput(){
        const inputs = this.modal.querySelectorAll("input, textarea");
        inputs.forEach(input => input.value = "");
    }
    static async getNewTask(){  
        //let name = prompt("Input the task name:");
        //let desc = prompt("Input the task's description:");
        let modal = new Modal("myModal")//selects modal ID
        modal.open();
        const inputReceived = await modal.waitForInput();//pauses for input, await applies to async function
        if(inputReceived){//if recieved, create new task
            return new Task(modal.getInputValues("taskName"), modal.getInputValues("taskDesc"));
        }else{
          return null;
        }
   }
   static async getNewList(){
        //let name = prompt("Input the task name:");
        //let desc = prompt("Input the task's description:");
        let modal = new Modal("myModal2")
        modal.open();
        const inputReceived = await modal.waitForInput();
        if(inputReceived){
            return new List(modal.getInputValues("listName"));
        }else{
          return null;
        }
   }
   getInputValues(input){
        const inputElement = this.modal.querySelector(`#${input}`); //returns value of listname,taskname, taskdesc to create list and task
        if(inputElement){
            
            return inputElement.value;
        }
        else{
            return null;
        }
    }
}
