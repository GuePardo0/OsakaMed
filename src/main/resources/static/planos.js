// interface changes
let header = document.getElementById("login_header");
let header_height = header.offsetHeight + header.offsetTop;
let header_filler = document.getElementById("header_filler");
let batom_box = document.getElementById("batom_box");
header_filler.style.height = `${header_height}px`;
batom_box.style.top = `${header_height - 157}px`;