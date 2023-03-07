import Chatroom from "./chat.js";
import { ChatUI } from "./ui.js";

let ul = document.querySelector(".display-messages");
let btnSend = document.getElementById("btn-send");
let inputMessage = document.getElementById("input-msg");
let btnUpdate = document.getElementById("btn-update");
let inputUpdate = document.getElementById("input-update");
let navigation = document.getElementById("navs");
let navItems = document.querySelectorAll(".nav-link");
let generalTab = document.getElementById("#general");
let showChangedUsername = document.getElementById("username-changed");
let btnsDelete = document.getElementsByName("trash-outline");

// Local Storage:
let username = "Anonymous";
if (localStorage.username) {
  username = localStorage.username;
}
let room = "#general";
if (localStorage.room) {
  room = localStorage.room;
}

// Get last active room (white tab)
let lastActiveBtn = localStorage.getItem("activeBtn");
let lastActiveRoom = localStorage.getItem("room");
navItems.forEach((item) => {
  if (lastActiveBtn === null && lastActiveRoom === null) {
    generalTab.classList.add("selected");
  } else if (item.id === lastActiveRoom) {
    item.classList.add("selected");
  }
});

/////////////////////////////////////////////////
let chatroom = new Chatroom(room, username);
let chatUI = new ChatUI(ul);
chatroom.getChats((data) => {
  chatUI.templateLi(data);
});

// Send message:
btnSend.addEventListener("click", () => {
  if (inputMessage.value !== "") {
    chatroom
      .addChat(inputMessage.value)
      .then(() => (inputMessage.value = ""))
      .catch((err) => console.log(err));
  } else {
    alert("Please enter your message!");
  }
});

// Update username
btnUpdate.addEventListener("click", () => {
  chatroom.username = inputUpdate.value;
  localStorage.setItem("username", inputUpdate.value);

  let showName = `<p class="usernameChangedDisplay">User ${inputUpdate.value} is typing...</p>`;
  showChangedUsername.innerHTML = showName;
  showChangedUsername.style.display = "block";
  setTimeout(() => {
    showChangedUsername.style.display = "none";
  }, 3000);
  inputUpdate.value = "";
  location.reload();
});

// Change room buttons
navigation.addEventListener("click", (e) => {
  if (e.target.tagName == "A") {
    let newRoom = e.target.textContent;
    chatroom.updateRoom(newRoom);
    chatUI.clearUL();
    chatroom.getChats((data) => {
      chatUI.templateLi(data);
    });

    localStorage.setItem("room", newRoom);
  }
});

// Selected room (style)
navItems.forEach((item) => {
  item.addEventListener("click", addSelection, false);
});
function addSelection(e) {
  navItems.forEach((item) => item.classList.remove("selected"));
  this.classList.add("selected");
  localStorage.setItem("activeBtn", e.target.id);
}

// Delete messages
setTimeout(() => {
  btnsDelete.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.tagName === "ION-ICON") {
        if (window.confirm("Do you really want to delete this message?")) {
          let li = e.target.parentElement.parentElement;
          let id = li.id;
          let liUser = li.querySelector(".username").textContent;

          if (localStorage.username == liUser) {
            console.log(id);
            console.log(liUser);
            li.remove();
            chatroom.removeChat(id);
            alert("Message successfully deleted!");
          } else {
            li.remove();
          }
        }
      }
    });
  });
}, 1000);
