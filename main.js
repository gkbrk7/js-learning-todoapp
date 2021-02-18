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

const getTodos = (() => {
    todos = JSON.parse(window.localStorage.getItem("todos")) || []
    todos.forEach(item => {
        var li = $("<li></li>").append(item)
        $(li).css({
            "background-color": "black",
            "color": "white"
        })

        // $(li).attr("class", "done")
        // $(li).attr("style", "")

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
        })

        var text = $(li).text();
        text = text.substr(0, text.length - 1)
        todos.push(text)

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