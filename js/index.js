var os = document.querySelector(".os")
var screen = document.querySelector(".screen")
var startup = document.querySelector(".startup")

// Remove Element - Native Function
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

// Startup
setTimeout(function() {
    os.style.display = "initial";
    startup.style.display = "none";
}, 1000)

// File Selection
storage = {}
var file = document.getElementsByClassName("file")
for(i = 0; i < file.length; i++) {
    var filename = file[i].getAttribute("file")
    var filetype = file[i].getAttribute("type")
    var action = file[i].getAttribute("action")
    if (filetype != "folder") file[i].childNodes[1].innerHTML = filename + "." + filetype
    else file[i].childNodes[1].innerHTML = filename

    file[i].id = filename.replace(/\s/g, '');

    storage[filename] = {}
    storage[filename]["type"] = filetype
    storage[filename]["action"] = action

    file[i].setAttribute("onclick", 'openfile("' + filename + '", "' + filetype + '", "' + action + '")')
}

function dragElement(elmnt, header) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  header.onmousedown = dragMouseDown;
  elmnt.style.zIndex = "100"

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    if (elmnt.offsetTop >= 30 && elmnt.offsetLeft >= 0) {
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    } else if (elmnt.offsetTop <= 30 && elmnt.offsetLeft >= 0) {
        elmnt.style.top = (elmnt.offsetTop + 1) + "px";
    } else if (elmnt.offsetTop >= 30 && elmnt.offsetLeft <= 0) {
        elmnt.style.left = (elmnt.offsetLeft + 1) + "px";
    } else if (elmnt.offsetTop <= 30 && elmnt.offsetLeft <= 0) {
        elmnt.style.top = (elmnt.offsetTop + 1) + "px";
        elmnt.style.left = (elmnt.offsetLeft + 1) + "px";
    }

    var windows = document.getElementsByClassName("window")
    for(i = 0; i < windows.length; i++) {
        file[i].style.zIndex = "10"
    }
    elmnt.style.zIndex = "11"
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;

    var windows = document.getElementsByClassName("window")
    for(i = 0; i < windows.length; i++) {
        file[i].style.zIndex = "10"
    }
    elmnt.style.zIndex = "10"
  }
}

// Close Button
setInterval(function() {
    var close = document.getElementsByClassName("close")
    for(i = 0; i < close.length; i++) {
        var filename = close[i].id
        close[i].setAttribute("onclick", 'exitfile("' + filename + '")')
    }
}, 100)

function openfile(name, type, action) {
    newwindow(name, type, action);
}

function exitfile(name) {
    document.getElementById(name).remove();
}

var winnum = 0
function newwindow(name, type, action) {
    winnum += 1;
    if (type == "txt") {
        wd = document.createElement("div")
        wd.className = "window"
        wd.id = winnum + name
        screen.appendChild(wd)

        header = document.createElement("header")
        header.className = "header"
        wd.appendChild(header)

        close = document.createElement("button")
        close.className = "close"
        close.innerHTML = "x"
        close.id = winnum + name
        header.appendChild(close)

        dragElement(wd, header);

        headertitle = document.createElement("span")
        headertitle.className = "title"
        headertitle.innerHTML = name + "." + type
        header.appendChild(headertitle)

        text = document.createElement("textarea")
        text.className = "txt"
        text.contenteditable = "true"
        text.spellcheck = false;
        text.value = action;
        wd.appendChild(text)
    } else if (type == "gif") {
        wd = document.createElement("div")
        wd.className = "window"
        wd.id = winnum + name
        screen.appendChild(wd)

        header = document.createElement("header")
        header.className = "header"
        wd.appendChild(header)

        close = document.createElement("button")
        close.className = "close"
        close.innerHTML = "x"
        close.id = winnum + name
        header.appendChild(close)

        dragElement(wd, header);

        headertitle = document.createElement("span")
        headertitle.className = "title"
        headertitle.innerHTML = name + "." + type
        header.appendChild(headertitle)

        gif = document.createElement("img")
        gif.className = "gif"
        gif.src = action;
        wd.appendChild(gif)
    } else if (type == "jpg") {
        wd = document.createElement("div")
        wd.className = "window"
        wd.id = winnum + name
        screen.appendChild(wd)

        header = document.createElement("header")
        header.className = "header"
        wd.appendChild(header)

        close = document.createElement("button")
        close.className = "close"
        close.innerHTML = "x"
        close.id = winnum + name
        header.appendChild(close)

        dragElement(wd, header);

        headertitle = document.createElement("span")
        headertitle.className = "title"
        headertitle.innerHTML = name + "." + type
        header.appendChild(headertitle)

        img = document.createElement("img")
        img.className = "jpg"
        img.src = action;
        wd.appendChild(img)
    } else if (type == "zip") {
        wd = document.createElement("div")
        wd.className = "window"
        wd.id = winnum + name
        screen.appendChild(wd)

        header = document.createElement("header")
        header.className = "header"
        wd.appendChild(header)

        close = document.createElement("button")
        close.className = "close"
        close.innerHTML = "x"
        close.id = winnum + name
        header.appendChild(close)

        dragElement(wd, header);

        headertitle = document.createElement("span")
        headertitle.className = "title"
        headertitle.innerHTML = name + "." + type
        header.appendChild(headertitle)
    }
}