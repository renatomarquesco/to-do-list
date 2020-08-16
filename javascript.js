$(document).ready(function () {
    console.log("dom ready");

    // VAriables to access elements

    var divToadd = $("#divToAdd");
    var input = $("#input");
    var addbutton = $("#addToDo");


    // function to display all tasks
    var displayTasks = function () {
        $.ajax({
            type: 'GET',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=178',
            dataType: 'json',
            success: function (response, textStatus) {
                console.log(response);
                divToadd.empty()

                // function to iterate over response and get all the tasks/

                response.tasks.forEach(function (task) {
                    var newdiv = $("<div class ='row newrow col-12 d-flex newdiv '></div>")
                    divToadd.prepend(newdiv);
                    var divCheck = $("<div class ='col-lg-3 col-4 text-left div-check'></div>")
                    newdiv.append(divCheck)
                    var span = $("<img class = 'span' src='./imgs/lista-de-controle.png' width = '40px' alt=''>")
                    divCheck.append(span);
                    var checkbox = $('<input class= "check-box" type="checkbox" id="checkbox" data-id = "' + task.id + '"' + (task.completed ? 'checked' : "") + '>');
                    divCheck.append(checkbox)
                    var divText = $("<div class ='col-lg-7 col-6 text-left div-text'></div>")
                    newdiv.append(divText);
                    divText.append("<p class = 'text' data-id = '" + task.id + "'>" + task.content + "</p>")
                    var divBtn = $("<div class ='col-lg-2 col-2 div-btn text-right'></div>")
                    newdiv.append(divBtn)
                    var removebtn = $("<img class = 'remove' src='./imgs/excluir-preto.png' width='12px' alt='' data-id =" + task.id + ">")
                    divBtn.append(removebtn);


                })
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }

    // function to create tasks

    var createTask = function () {
        $.ajax({
            type: "POST",
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=178',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify({
                task: {
                    content: input.val()
                }
            }),
            success: function (response, textStatus) {
                displayTasks()
                input.val("")
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage)
            }

        });
    }
    //link create task function to the add button
    addbutton.on("click", function () {
        createTask();
    });
    displayTasks();

    // function to delete task
    var deleteTask = function (id) {
        $.ajax({
            type: "DELETE",
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=178',
            success: function (response, textStatus) {
                displayTasks()
            },

            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        })
    }
    // function to link delete function to remove button
    $(document).on("click", ".remove", function () {
        deleteTask($(this).data("id"))
    });

    // function to mark tasks as completed
    var markCompleted = function (id) {
        $.ajax({
            type: "PUT",
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=178',
            dataType: "json",
            success: function (response, textStatus) {
                displayTasks;
            },

            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        })
    }

    // function to mark tasks as active
    var markActive = function (id) {
        $.ajax({
            type: "PUT",
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=178',
            dataType: "json",
            success: function (response, textStatus) {
                displayTasks;
            },

            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        })
    }
    // link active and completed functions to buttons
    $(document).on("change", ".check-box", function () {
        var dataId = $(this).data("id");
        if (this.checked) {
            markCompleted($(this).data("id"));
            $(this).siblings().css("color", "#f1acac")
            $(this).parent().next().css("text-decoration", "line-through")
        } else {
            markActive($(this).data("id"))
            $(this).siblings().css("color", "#5a5a5a")
            $(this).parent().next().css("text-decoration", "none")

        }
    })
    //all filter button
    $("#all").on("click", function () {
        displayTasks();
    })
    // complete filter button
    $("#completed").on("click", function () {
        $.ajax({
            type: 'GET',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=178',
            dataType: 'json',
            success: function (response, textStatus) {
                divToadd.empty();
                response.tasks.forEach(function (task) {
                    if (task.completed) {
                    var newdiv = $("<div class ='row newrow col-12 d-flex newdiv '></div>")
                    divToadd.prepend(newdiv);
                    var divCheck = $("<div class ='col-lg-3 col-4 text-left div-check'></div>")
                    newdiv.append(divCheck)
                    var span = $("<img class = 'span' src='./imgs/lista-de-controle.png' width = '40px' alt=''>")
                    divCheck.append(span);
                    var checkbox = $('<input class= "check-box" type="checkbox" id="checkbox" data-id = "' + task.id + '"' + (task.completed ? 'checked' : "") + '>');
                    divCheck.append(checkbox)
                    var divText = $("<div class ='col-lg-7 col-6 text-left div-text'></div>")
                    newdiv.append(divText);
                    divText.append("<p class = 'text' data-id = '" + task.id + "'>" + task.content + "</p>")
                    var divBtn = $("<div class ='col-lg-2 col-2 div-btn text-right'></div>")
                    newdiv.append(divBtn)
                    var removebtn = $("<img class = 'remove' src='./imgs/excluir-preto.png' width='12px' alt='' data-id =" + task.id + ">")
                    divBtn.append(removebtn);
                    }
                })


            }

        });
    })
    // active filter button
    $("#active").on("click", function () {
        $.ajax({
            type: 'GET',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=178',
            dataType: 'json',
            success: function (response, textStatus) {
                divToadd.empty();
                response.tasks.forEach(function (task) {
                    if (task.completed === false) {
                        var newdiv = $("<div class ='row newrow col-12 d-flex newdiv '></div>")
                    divToadd.prepend(newdiv);
                    var divCheck = $("<div class ='col-lg-3 col-4 text-left div-check'></div>")
                    newdiv.append(divCheck)
                    var span = $("<img class = 'span' src='./imgs/lista-de-controle.png' width = '40px' alt=''>")
                    divCheck.append(span);
                    var checkbox = $('<input class= "check-box" type="checkbox" id="checkbox" data-id = "' + task.id + '"' + (task.completed ? 'checked' : "") + '>');
                    divCheck.append(checkbox)
                    var divText = $("<div class ='col-lg-7 col-6 text-left div-text'></div>")
                    newdiv.append(divText);
                    divText.append("<p class = 'text' data-id = '" + task.id + "'>" + task.content + "</p>")
                    var divBtn = $("<div class ='col-lg-2 col-2 div-btn text-right'></div>")
                    newdiv.append(divBtn)
                    var removebtn = $("<img class = 'remove' src='excluir-preto.png' width='12px' alt='' data-id =" + task.id + ">")
                    divBtn.append(removebtn);
                    }
                })
            }

        });
    })


});