var enterButton = $("#enter")
var input = $("#userInput")
var ul = $("body").find("ul").eq(1)
var item = $(".listItems>ul>li")
var todos = []

const inputLength = () => $(input).val().length;
const listLength = () => $(item).length;

const setTodos = (todos) => {
    window.localStorage.setItem("todos", JSON.stringify(todos))
}

const getTodos = () => {
    var todos = JSON.parse(window.localStorage.getItem("todos")) || []
    console.log(todos)
    todos.forEach(item => {
        var li = $("<li></li>").append(item)
        $(li).css({
            "background-color": "black",
            "color": "white"
        })
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
        })
        var button = $("<button></button>")
        $(button).text("X")
        $(button).attr("class", "pos")
        $(button).click(function () {
            $(this).parent("li").remove()
            var index = todos.indexOf($(this).parent("li").text())
            todos.splice(index, 1)
            setTodos(todos)
        })
        $(li).append(button)
        $(ul).append(li)
    })
    //return JSON.parse(todos)
}

getTodos()

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
        $(button).click(function () {
            $(this).parent("li").remove()
            todos.pop()
            setTodos(todos)
        })
        $(li).append(button)
        $(ul).append(li)
        input[0].value = ""

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
        })
        var text = $(li).text();

        todos.push(text.slice(0, text.length - 1))
        setTodos(todos)
    }
})

$(input).keypress(function (e) {
    if (inputLength() > 0 && e.which === 13) {
        $(enterButton).trigger("click");
    }
})