console.log('index.js sourced');

$(document).ready(function(){
  console.log('document ready sourced');
  //show tasks on page load
  getTasks();

  //Add tasks to list
  $('#createTask').on('click', function(){
    console.log('in createTask on click');

    //user input
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
        getTasks();
      }//end success
    });//end ajax
  });//end createTask on click

  //on checkbox click: change complete status in database
  $(document).on('change', 'input[type="checkbox"]', function() {
    console.log('in input on change');
    console.log( "this.attr.id", $(this).attr('id') );
      var objectToSend = {
        id : $(this).attr('id'),
        completed : $(this).is(':checked')
      }; // end object

      $.ajax({
        type: 'PUT',
        url: '/changeStatus',
        data: objectToSend,
        success: function (data){
          console.log('in ajax success changeStatus');
          getTasks();
        }//end success
      });//end ajax
  });//end checkbox change

//on click delete task
  $('#taskList').on('click', '.delete', function() {
    console.log('in on click delete');
    // console.log(this);

    if (confirm("Do you want to delete this task?") === true) {
      console.log('in if confirm statement');
      var objectToSend = {
        id : $(this).attr('id'),
      }; // end object
      $.ajax({
        type: 'DELETE',
        url: '/deleteTask',
        data: objectToSend,
        success: function (data){
          console.log('in ajax success deleteTask');
          //update list
          $('#taskList').empty();
        }//end success
        // error: function(error){console.log("ERROR", error)}//end error
      });//end ajax
      getTasks();
    };//end if
  });//end delete
});//end document ready

//Display updated task list on DOM
var getTasks = function(){
  $.ajax({
    type: 'GET',
    url: '/List',
    success: function (task){
      console.log('in ajax success list');
      var outputText = '';
      for (var i = 0; i < task.length; i++) {
      var checked = '';
      //check if task is completed
      if( task[i].completed ) {
      	checked = ' checked="true"';
        $('#taskList').empty();
      }//end if
        var line= '<input type="checkbox" ' + checked + ' class="checkbox" id="' + task[i].id + '"><span>'+ task[i].task + '</span> <button class="delete" id="'+task[i].id+'">Delete</button>';
        outputText += '<p id="task' + i + '">' + line + '</p>';
        $('#taskList').html(outputText);
      }//end for
    }//end success
  });//end ajax
}//end getTasks
