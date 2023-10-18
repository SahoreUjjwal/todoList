var taskList =[];
var id = 0;
var count=0;


class tasks{
    constructor(text){
        this.id = ++id;
        this.text = text;
        this.completed = false;
    }
}

var searchIcon = document.getElementById("search-icon");
var icon = document.getElementById("search");

//to toggle the color of the list type all,incomplete,complete
var toggleClass=function (type){
    var ele = document.querySelectorAll(".task-selection button");
    ele.forEach((button)=>{
        if(button.id == type)
        {
            button.className = "default-color";
        }
        else{
            button.className="font-color";
        }
    } )
};

//hide and unhide the search button
var toggleDisplay= function(event){
    if(event.type=="mouseover")
    {
        searchIcon.style.visibility="visible";
    }  
    else{
        searchIcon.style.visibility="hidden";
    }
    return;
}
var getInputTag = document.getElementById("input-section");
getInputTag.addEventListener("mouseover",toggleDisplay);
getInputTag.addEventListener("mouseout",toggleDisplay);


//function to  create the task
var createTask = function(){
    var inputArea = document.getElementById("input-area");
    var text = inputArea.value;
    if(text =="" ||text ==undefined)
    {
        alert("Cannot leave the field empty");
        return;
    }
    var task = new tasks(text);
    taskList.push(task);
    count++;
    renderList("incomplete");
    inputArea.value="";
    return;
}
//adding event listener to the search icon
icon.addEventListener("click",createTask);


//function to display the count of incomplete tasks
var refreshCount =function(){
    var countDiv = document.getElementById('tasks-count');
    countDiv.innerHTML="";
    countDiv.innerHTML=`<span>${count}</span><span class="font-color">&nbsptasks left</span>`;

}

//function to render the list based on the task status;
var renderList = function(type){
    
    var element = document.querySelectorAll(".list-content");
    var div4 = document.getElementById("mid-section");
    //If it isn't "undefined" and it isn't "null", then it exists.
    
    if(typeof(element) != 'undefined' && element.length!=0){
        //console.log("ki",element);
        element.forEach((e)=>{
            e.remove();
        });  
    }
    toggleClass(type);
    if(type=='all')
    { 
       refreshCount();
       //console.log(taskList);
       if(taskList.length==0)
        {
            div4.innerHTML = "<p id=\"pending-text\">No tasks Pending</p>";
            return;
        }
        else{
            div4.innerHTML = "";
        }
       taskList.forEach((task) =>
        {
            if(task.completed==false)
            {
            div4.innerHTML +=`
            <div class="list-content">
                <div id="disc-icon">
                    <i class="fa-regular fa-circle bullet-style"></i>
                </div>
                <div class="task-text">
                    <span id="task-description">${task.text}</span>
                </div>
                <div id="icon-div">
                    <i id="complete-icon" class="fa-solid fa-check delete-button" data-id=${task.id}></i>
                </div>  
            </div>`;
            }
            else{
                div4.innerHTML +=`
                <div class="list-content">
                    <div id="disc-icon">
                        <i class="fa-regular fa-circle bullet-style"></i>
                    </div>
                    <div class="task-text">
                        <span id="task-description">${task.text}</span>
                    </div>
                    <div id="icon-div">
                    </div>  
                </div>`;
            }
        }
       )
       var completeIcon = document.querySelectorAll("#complete-icon");
       completeIcon.forEach((icon)=>
       {
           icon.addEventListener("click",completeTask)
       });
       var hoverDescreption = document.querySelectorAll(".task-text");
       hoverDescreption.forEach((div)=>{ 
        div.addEventListener("mouseover",displayTask);
        div.addEventListener("mouseout",displayTask);
       });
      
    return; 
    }
    else if(type=='completed')
    {
        refreshCount();
        div4.innerHTML = "";
        taskList.forEach((task)=>
            {
                if(task.completed==true)
                {
                    div4.innerHTML +=`
                        <div class="list-content">
                            <div id="disc-icon">
                                <i class="fa-regular fa-circle bullet-style"></i>
                            </div>
                            <div class="task-text">
                                <span id="task-description">${task.text}</span>
                            </div>
                        </div>`;
                }    
            }
        )
        var hoverDescreption = document.querySelectorAll(".task-text");
       hoverDescreption.forEach((div)=>{ 
        div.addEventListener("mouseover",displayTask);
        div.addEventListener("mouseout",displayTask);
       });
       return;
    }
    else{
        refreshCount();
        if(count==0)
        {
            div4.innerHTML = "<p id=\"pending-text\">No tasks Pending</p>";
            return;
        }
        else{
            div4.innerHTML = "";
        }
        taskList.forEach((task)=>
            {
                if(task.completed==false)
                {
                    div4.innerHTML +=`
                    <div class="list-content">
                        <div id="disc-icon">
                            <i class="fa-regular fa-circle bullet-style"></i>
                        </div>
                        <div class="task-text">
                            <span id="task-description">${task.text}</span>
                        </div>
                        <div id="icon-div">
                            <i id="complete-icon" class="fa-solid fa-check delete-button" data-id=${task.id}></i>
                        </div>  
                    </div>`;
                }
            }
        )
        var completeIcon = document.querySelectorAll("#complete-icon");
        
        completeIcon.forEach((icon)=>
        {   
            
            icon.addEventListener("click",completeTask)
        });
        var hoverDescreption = document.querySelectorAll(".task-text");
        hoverDescreption.forEach((div)=>{ 
            div.addEventListener("mouseover",displayTask);
            div.addEventListener("mouseout",displayTask);
        });
                   
    }
    return; 
}

var displayDescreption = document.getElementById("container-description");
var container = document.getElementById("container");
var displayTask=function(e){
    if(e.type =="mouseover")
    {
   
        displayDescreption.style.display ="block";
        displayDescreption.innerHTML = e.target.innerText;
        container.style.borderRadius = "1rem 1rem 0rem 0rem";
    }
    else{
        displayDescreption.style.display ="none";
        container.style.borderRadius = "1rem 1rem 1rem 1rem";
    }
};

//function to complete the task;
var completeTask = function(e){ 

    if(e.target.className =="fa-solid fa-check delete-button")
    {
       taskList.forEach(task => {
        if(e.target.dataset.id ==task.id)
        {
            task.completed=true;
            count--;
        }
       })
    }
    renderList('incomplete');
    return;
}

//function to clear the completed task list
var clearCompleted= function(){
    var tempList = taskList.filter(task => task.completed!=true)
    taskList  = tempList;
    renderList('all');
    return;
}

//to complete all the tasks
var completeAll= function(){
    taskList.forEach(task =>{task.completed=true});
    count =0;
    renderList('All');
}
renderList('incomplete');
