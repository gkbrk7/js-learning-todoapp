var enterButton = $("#enter")
var input = $("#userInput")
var ul = $("body").find("ul").eq(1)
var item = $(".listItems>ul>li")
var todos = []

const inputLength = () => $(input).val().length;
const listLength = () => $(item).length;
const readTodos = () => JSON.parse(window.localStorage.getItem("todos"))

const setStatus = (item) => {
    var text = $(item).text();
    text = text.substr(0, text.length - 1)
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


const getTodos = (() => {
    todos = readTodos() || []
    todos.forEach(item => {
        var li = $("<li></li>").append(item.todo)
        $(li).css({
            "background-color": "black",
            "color": "white"
        })

        if (item.status === "done") {
            $(li).attr("class", item.status)
            $(li).attr("style", "")
        }

        var button = $("<button></button>")
        $(button).text("X")
        $(button).attr("class", "pos")

        $(li).append(button)
        $(ul).append(li)

        $(li).on("click", function () {
            if ($(this).attr("class") === "done") {
                $(this).css({
                    "background-color": "black",
                    "color": "white"
                })
            } else {
                $(this).attr("style", "")
            }
            $(this).toggleClass("done")
            setStatus(this)
        })

        $(button).click(function () {
            var text = $(this).parent("li").text();
            index = todos.indexOf(text.substr(0, text.length - 1))
            $(this).parent("li").remove()
            todos.splice(index, 1)
            setTodos(todos)
        })
    })
    setTodos(todos)
})()

$(enterButton).click(function () {
    if (input[0].value.length > 0) {
        var li = $("<li></li>").append(input[0].value)
        $(li).css({
            "background-color": "black",
            "color": "white"
        })

        var button = $("<button></button>")
        $(button).text("X")
        $(button).attr("class", "pos")

        $(li).append(button)
        $(ul).append(li)

        $(li).on("click", function () {
            if ($(this).attr("class") === "done") {
                $(this).css({
                    "background-color": "black",
                    "color": "white"
                })
            } else {
                $(this).attr("style", "")
            }
            $(this).toggleClass("done")
            setStatus(this)
        })
        var object = {}
        var text = $(li).text();
        text = text.substr(0, text.length - 1)
        object.todo = text;
        object.status = $(li).attr("class") || "";
        todos.push(object)

        $(button).click(function () {
            var text = $(this).parent("li").text();
            index = todos.indexOf(text.substr(0, text.length - 1))
            $(this).parent("li").remove()
            todos.splice(index, 1)
            setTodos(todos)
        })

        setTodos(todos)
        input[0].value = ""
    }
})


$(input).keypress(function (e) {
    if (inputLength() > 0 && e.which === 13) {
        $(enterButton).trigger("click");
    }
})