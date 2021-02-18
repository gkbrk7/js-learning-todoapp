var enterButton = $("#enter")
var input = $("#userInput")
var ul = $("body").find("ul").eq(1)
var item = $(".listItems>ul>li")
var todos = []

const inputLength = () => $(input).val().length;
const listLength = () => $(item).length;
const readTodos = () => JSON.parse(window.localStorage.getItem("todos")) || []

const setStatus = (item) => {
    var text = $(item).text();
    var elements = readTodos()
    elements.forEach((value) => {
        if (value.todo === text) {
            $(item).attr("class") === "done" ? value.status = "done" : value.status = ""
        }
    })
    setTodos(elements)
}

const setTodos = (todos) => {
    window.localStorage.setItem("todos", JSON.stringify(todos))
}

const getTodos = () => {
    todos = readTodos()
    todos.forEach(item => {
        var li = $("<li></li>").append(item.todo)
        $(li).css({
            "background-color": "black",
            "color": "white"
        })

        var button = $("<i></i>")
        //$(button).text("X")
        $(button).attr("class", "pos")

        if (item.status === "done") {
            $(li).attr("class", item.status)
            $(li).attr("style", "")
            $(button).addClass("fas fa-check")
        } else {
            $(button).addClass("fas fa-trash")
        }

        $(li).append(button)
        $(ul).append(li)

        $(li).on("click", function () {
            if ($(this).attr("class") === "done") {
                $(this).css({
                    "background-color": "black",
                    "color": "white"
                })
                $(button).removeClass("fas fa-check")
                $(button).addClass("fas fa-trash")
            } else {
                $(this).attr("style", "")
                $(button).removeClass("fas fa-trash")
                $(button).addClass("fas fa-check")
            }
            $(this).toggleClass("done")
            setStatus(this)
        })

        $(button).click(function () {
            var text = $(this).parent("li").text()
            todos = readTodos().filter(value => value.todo !== text)
            setTodos(todos)
            $(this).parent("li").remove()
        })
    })
    setTodos(todos)
}
getTodos()

$(enterButton).click(function () {
    if (input[0].value.length > 0) {
        var text = input[0].value;
        var object = {
            todo: text,
            status: ""
        }
        todos.push(object)
        setTodos(todos)
        $(ul).empty()
        getTodos()
        input[0].value = ""
    }
})

$(input).keypress(function (e) {
    if (inputLength() > 0 && e.which === 13) {
        $(enterButton).trigger("click");
        $(ul).empty()
        getTodos()
    }
})

