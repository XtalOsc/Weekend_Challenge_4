console.log('index.js sourced');

$(document).ready(function(){
  console.log('document ready sourced');
var taskArray = [];

//ajax calls go in doc ready


//store task in database
$('#createTask').on('click', function(){
console.log('in createTask on click');

//get user input
// create object for tasks
var objectToSend = {
task : $('#taskIn').val(),
completed : false
}; // end object
console.log('tasks: ',objectToSend);

$.ajax({
  type: 'POST',
  url: '/addTask',
  data: objectToSend,
  success: function (data){
    console.log('in ajax success addTask, returned ',data);
    //push to task array
    taskArray=data;
    console.log('task array: ',taskArray);
    listTasks(taskArray);
  }//end success
});//end ajax
});//end createTask on click

//refresh frontend to show tasks after one is added
//complete or delete option
//css change upon completion
//task complete or not complete stored in database
//delete task removed from front end and database


});//end document ready

//functions are outside of doc ready
