console.log('index.js sourced');

$(document).ready(function(){
  console.log('document ready sourced');
  var taskArray = [];

  //store task in database
  $('#createTask').on('click', function(){
    console.log('in createTask on click');

    //get user input
    var objectToSend = {
      task : $('#taskIn').val(),
      completed : false
    }; // end object

    $.ajax({
      type: 'POST',
      url: '/addTask',
      data: objectToSend,
      success: function (data){
        console.log('in ajax success addTask');
        //push to task array
        taskArray=data;
        console.log('task array: ',taskArray);
        listTasks(taskArray);
      }//end success
    });//end ajax
  });//end createTask on click

  //on checkbox click: change complete status in database
  $(document).on('change', 'input', function() {
    console.log('in input on change');
    if($(this).is(':checked')){
      console.log('box ', $( this ).attr('id'), ' is checked');
    }//end if
    else if (!$(this).is(':checked')){
      console.log('box ', $( this ).attr('id'), ' is not checked');
    }//end else if
  });//end checkbox change
});//end document ready

var listTasks = function(task){
  console.log('in listTasks');
  console.log('taskArray:', task);
  var outputText = '';
  for (var i = 0; i < task.length; i++) {
    var line= '<input type=\"checkbox\" class=\"checkbox\" id="' + task[i].id + '"><span>'+ task[i].task + "</span> <button id=\"delete\">Delete</button>"
    outputText += '<p id="task' + i + '">' + line + '</p>';
    $('#taskList').html(outputText);
  }//end for loop
  // console.log("outputText in listTasks:",outputText);
}//end listTasks function
